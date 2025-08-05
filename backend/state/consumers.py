import json
from channels.generic.websocket import WebsocketConsumer
from channels.db import database_sync_to_async
from .models import MachineEvent,Event
from .serializers import EventSerializerRead
from .serializers import MachineEventSerializer
from asgiref.sync import async_to_sync
import logging
from uuid import UUID
import django.utils.timezone as timezone
from .util import calculate_oee


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)
    
def get_oee_grap_data(scope):

    list_oees = []
    try:
        for i in range(24):
            t_2 = timezone.now() - timezone.timedelta(hours= 23 - i)
            t_1 = timezone.now() - timezone.timedelta(hours= 24 - i)
            all_events=Event.objects.filter(machine__organization__uuid=scope['user']['organization']['uuid'],\
                                    machine__uuid = scope['machine'], created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
            oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)
            list_oees.append(oee_last_24h)
        return list_oees
    except :
        return []

class MachineConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope['user'] == None:
            self.close(code = 1011)
            return
        logging.warning(self.scope['user']['organization']['uuid'])
        self.room_group_name = 'data_' + self.scope['user']['organization']['uuid'] + '_' + self.scope['machine']
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
        list_oees = get_oee_grap_data(self.scope)

        events = Event.objects.filter(machine__uuid=self.scope['machine'],\
                                      is_filled=False,\
                                      machine__organization__uuid=self.scope['user']['organization']['uuid']).\
                                        select_related('machine__organization','machine','cell','fault','product','machine__created_by')\
                                        .order_by('-created_at')[:15][::-1]
        ser = EventSerializerRead(events,many=True)
        self.send(text_data=json.dumps({"data": ser.data,"oee":list_oees},cls=UUIDEncoder))
    def get_data(self):
        return MachineEvent.objects.all()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"data_message",
                "message":message
            }
        )
        
    def data_message(self,event):
        events = Event.objects.filter(machine__uuid=self.scope['machine'],\
                                      machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                        is_filled=False)\
                                        .order_by('-created_at')[:15][::-1]
        ser = EventSerializerRead(events,many=True)
        list_oees = get_oee_grap_data(self.scope)
       
        self.send(text_data=json.dumps({"data": ser.data,"oee":list_oees},cls=UUIDEncoder))

class OeeConsumer(WebsocketConsumer):
    def connect(self):
        if self.scope['user'] == None:
            self.close(code = 1011)
            return
        logging.warning(self.scope['user']['organization']['uuid'])
        self.room_group_name = 'oee_' + self.scope['user']['organization']['uuid'] + '_' + self.scope['machine']
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
        t_2 = timezone.now()
        t_1 = timezone.now() - timezone.timedelta(hours=1)
        all_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                    machine__uuid = self.scope['machine'], created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
        oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)
        
        self.send(text_data=json.dumps({"data": oee_last_24h},cls=UUIDEncoder))
    def get_data(self):
        return MachineEvent.objects.all()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"oee_message",
                "message":message
            }
        )
        
    def oee_message(self,event):
        t_2 = timezone.now()
        t_1 = timezone.now() - timezone.timedelta(hours=1)
        all_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                    machine__uuid = self.scope['machine'], created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
        oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)
        
        self.send(text_data=json.dumps({"data": oee_last_24h},cls=UUIDEncoder))

class ReportConsumer(WebsocketConsumer):    
    def connect(self):
        if self.scope['user'] == None:
            self.close(code = 1011)
            return
        logging.warning(self.scope['user']['organization']['uuid'])
        self.room_group_name = 'report_' + self.scope['user']['organization']['uuid'] + '_' + self.scope['machine']
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
        list_oees = get_oee_grap_data(self.scope)
        
        last_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                         machine__uuid = self.scope['machine']).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('-created_at').first()
        ser = EventSerializerRead(last_events) 
        self.send(text_data=json.dumps({"data": ser.data,"oee":list_oees },cls=UUIDEncoder))
    def get_data(self):
        return MachineEvent.objects.all()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"report_message",
                "message":message
            }
        )
        
    def report_message(self,event):
        list_oees = get_oee_grap_data(self.scope)
        last_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                         machine__uuid = self.scope['machine']).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('-created_at').first()
        ser = EventSerializerRead(last_events) 
        self.send(text_data=json.dumps({"data": ser.data,"oee":list_oees},cls=UUIDEncoder))

class OeeConsumer2(WebsocketConsumer):
    def connect(self):
        if self.scope['user'] == None:
            self.close(code = 1011)
            return
        logging.warning(self.scope['user']['organization']['uuid'])
        self.room_group_name = 'oee_' + self.scope['user']['organization']['uuid'] + '_' + self.scope['machine']
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
        list_oees = get_oee_grap_data(self.scope)
        t_2 = timezone.now()
        t_1 = timezone.now() - timezone.timedelta(hours=24)
        all_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                    machine__uuid = self.scope['machine'], created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
        oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)
        events = Event.objects.filter(machine__uuid=self.scope['machine'],\
                                      machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                        is_filled=False)\
                                        .order_by('-created_at')[:1]
        ser = EventSerializerRead(events,many=True)

        self.send(text_data=json.dumps({"data": oee_last_24h,"oee":list_oees,"list":ser.data},cls=UUIDEncoder))
    def get_data(self):
        return MachineEvent.objects.all()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"oee_message",
                "message":message
            }
        )
        
    def oee_message(self,event):
        list_oees = get_oee_grap_data(self.scope)
        t_2 = timezone.now()
        t_1 = timezone.now() - timezone.timedelta(hours=1)
        all_events=Event.objects.filter(machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                    machine__uuid = self.scope['machine'], created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
        oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)
        events = Event.objects.filter(machine__uuid=self.scope['machine'],\
                                      machine__organization__uuid=self.scope['user']['organization']['uuid'],\
                                        is_filled=False)\
                                        .order_by('-created_at')[:1]
        ser = EventSerializerRead(events,many=True)
        self.send(text_data=json.dumps({"data": oee_last_24h,"oee":list_oees,"list":ser.data},cls=UUIDEncoder))
