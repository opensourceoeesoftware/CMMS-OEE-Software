from django.db import models
from db.models import BasicInfo,Asset,Organization
from django.db.models.signals import post_delete,post_save
from django.dispatch import receiver
from rest_framework import serializers
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from uuid import UUID
import json

from datetime import datetime
# Create your models here.
def default_machine_data():
    return {}
def create_asset_replacement():
    now = datetime.now()
    date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
    return Asset.objects.get_or_create(name='deleted_')[0]

class MachineEvent(BasicInfo):
    
    machine = models.ForeignKey(Asset, on_delete= models.CASCADE)
    data = models.JSONField(default = default_machine_data)

    def __str__(self):
        return "Data for "+  " at " + str(self.created_at)
    
class MachineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineEvent
        exclude = []
        depth = 2

class MachineFault(BasicInfo):
   name = models.CharField(max_length=100,default='')
   machine = models.ForeignKey(Asset,on_delete=models.CASCADE)
   def __str__(self):
      return self.name + ' ' + self.machine.name

class Cell(BasicInfo):
   machine = models.ForeignKey(Asset,on_delete=models.CASCADE)
   name = models.CharField(max_length=50,default="Cell")
   def __str__(self):
      return str(self.name )
     
class Product(BasicInfo):
   organization = models.ForeignKey(Organization,on_delete=models.CASCADE,blank=True,null=True)
   product_id = models.CharField(default ='',max_length=200,unique=True)
   product_name = models.CharField(default ='',max_length=200)
   ideal_quantity = models.FloatField(default=0)
   ideal_cycle_min = models.FloatField(default=0)
   ideal_cycle = models.FloatField(default=0)

class Event(BasicInfo):
   Event_choices =(
    ("on", "on"),
    ("off", "off"),

    ("run", "run"),
    ("stop", "stop"),

    ("out of order", "out of order"),
    ("resume out of order", "resume out of order"),

    ("failure", "failure"),
    ("resume failure", "resume failure"),

    ("break in", "break in"),
    ("resume break in", "resume break in"),

    ("break out", "break out"),
    ("resume break out", "resume break out"),

    ("fault", "fault"),
    ("resume fault", "resume fault"),

    ("report", "report"),
 
   )
   machine = models.ForeignKey(Asset,on_delete=models.SET_NULL,null=True)
   state = models.CharField(max_length=50,choices=Event_choices,default='')
   product = models.ForeignKey(Product,on_delete=models.SET_NULL,blank=True,null=True)
   cell = models.ForeignKey(Cell,on_delete=models.SET_NULL,blank=True,null=True)
   fault = models.ForeignKey(MachineFault,on_delete=models.SET_NULL,blank=True,null=True)
   quantity = models.IntegerField(default=0)
   scrap = models.IntegerField(default=0)
   is_filled = models.BooleanField(default=False)
   
   def __str__(self):
      machine = 'no-line'
      if self.machine :
          machine = self.machine.name
      return "Event: " + self.state + " of line : " + machine
class EventSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = []
        depth = 2
class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)
@receiver(post_save, sender=Event)
def create_first_oee_data(sender, instance=None, created=False, **kwargs):
    if created:
        try:
        # MachineEvent.objects.create(machine=instance,data = {"oee_on":0,"oee_run":0 , "oee_report":{"total":0,"scrap":0}})
            channel_layer = get_channel_layer()

            #sync machine state
            instance.machine.state = instance.state
            instance.machine.save()
            group_data_name = 'data_' + str(instance.machine.organization.uuid) + '_' + str(instance.machine.uuid)
            group_oee_name = 'oee_' + str(instance.machine.organization.uuid) + '_' + str(instance.machine.uuid)
            group_report_name = 'report_' + str(instance.machine.organization.uuid) + '_' + str(instance.machine.uuid)
            event = EventSerializerRead(instance)
            async_to_sync(channel_layer.group_send)(
                group_report_name,
                {
                    'type': 'report_message',
                    'message': json.dumps({"data": event.data},cls=UUIDEncoder) 
                }
            )
            async_to_sync(channel_layer.group_send)(
                group_data_name,
                {
                    'type': 'data_message',
                    'message':json.dumps({"data": event.data},cls=UUIDEncoder) 
                }
            )
            async_to_sync(channel_layer.group_send)(
                group_oee_name,
                {
                    'type': 'oee_message',
                    'message': json.dumps({"data": event.data},cls=UUIDEncoder) 
                }
            )
            
        except:
            pass
@receiver(post_save, sender=Asset)       
def create_off_event(sender, instance, created, **kwargs):
   if created:
      Event.objects.create(machine=instance,state='on')
      Event.objects.create(machine=instance,state='off')