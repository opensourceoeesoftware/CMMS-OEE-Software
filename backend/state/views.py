from rest_framework import viewsets
from .serializers import EventSerializer,EventSerializerRead,\
    MachineFaultSerializerRead,CellSerializerRead,ProductSerializer,CellSerializer,MachineFaultSerializer
from .models import Event,Cell,MachineFault,Product
from db.models import Asset

from rest_framework import authentication,status
from rest_framework.response import Response

from rest_framework import filters
from .permissions import ProductPermission,EventPermission,FaultReadPermission,CellReadPermission,FaultPermission,CellPermission
from .util import calculate_oee,get_missing_states,allowed_to_skip_fill,get_missing_states
import datetime
import django.utils.timezone as timezone
import logging
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [ProductPermission]
    def get_queryset(self, *args, **kwargs):
        return Product.objects.filter(organization=self.request.user.userprofile.organization )
    
    def create(self,request, *args, **kwargs):
        
        serialiser = ProductSerializer(data=request.data)
        if serialiser.is_valid():
            product = serialiser.save(organization = request.user.userprofile.organization)
            return Response(serialiser.data,status.HTTP_201_CREATED)
        else :
            return Response(serialiser.errors,status.HTTP_400_BAD_REQUEST)
    

class CellViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CellSerializerRead
    queryset = Cell.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields  = ['machine']
    permission_classes = [CellReadPermission]
    def get_queryset(self, *args, **kwargs):
        return Cell.objects.filter(machine__organization=self.request.user.userprofile.organization).\
            select_related('machine')

class CellsViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CellSerializer
    queryset = Cell.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [CellPermission]
    def get_queryset(self, *args, **kwargs):
        return Cell.objects.filter(machine__organization=self.request.user.userprofile.organization).\
            select_related('machine')

class MachineFaultViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = MachineFaultSerializerRead
    queryset = MachineFault.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    filter_backends = [filters.SearchFilter]
    permission_classes = [FaultReadPermission]
    search_fields  = ['machine']
    def get_queryset(self, *args, **kwargs):
        return MachineFault.objects.filter(machine__organization=self.request.user.userprofile.organization).\
            select_related('machine')

class MachineFaultsViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = MachineFaultSerializer
    queryset = MachineFault.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [FaultPermission]
    def get_queryset(self, *args, **kwargs):
        return MachineFault.objects.filter(machine__organization=self.request.user.userprofile.organization).\
            select_related('machine')
   
class DowntimeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    authentication_classes = [authentication.TokenAuthentication,authentication.SessionAuthentication]
    filter_backends = [filters.SearchFilter]
    search_fields  = ['machine']
    def get_queryset(self, *args, **kwargs):
        machine = self.request.query_params.get('machine')
        
        # created_at__gte = self.request.query_params.get('created_at__gte')
        created_at__gte = datetime.datetime.strptime(self.request.GET['created_at__gte'], '%Y-%m-%dT%H:%M:%S')  
        created_at__gte = timezone.make_aware(created_at__gte)

        # created_at__lte = self.request.query_params.get('created_at__lte')
        created_at__lte = datetime.datetime.strptime(self.request.GET['created_at__lte'], '%Y-%m-%dT%H:%M:%S')  
        created_at__lte = timezone.make_aware(created_at__lte)

        now = timezone.now()
        if created_at__lte > now :
            created_at__lte = now
        return Event.objects.filter(machine__organization=self.request.user.userprofile.organization,\
                                    machine__uuid = machine, created_at__gte=created_at__gte,\
                                    created_at__lte=created_at__lte).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')
    def list(self, request):
        t_2 = timezone.now()
        t_1 = timezone.now() - timezone.timedelta(hours=1)
        machine = self.request.query_params.get('machine')
        
        machine_obj = Asset.objects.select_related('organization').get(uuid=machine)
        if machine_obj.organization != request.user.userprofile.organization :
            return Response({"detail":"No!" },status.HTTP_401_UNAUTHORIZED)
        
        all_events=Event.objects.filter(machine__organization=self.request.user.userprofile.organization,\
                                    machine__uuid = machine, created_at__gte=t_1,\
                                    created_at__lte=t_2).\
            select_related('machine__organization','machine','cell','fault','product','machine__created_by').order_by('created_at')

        oee_last_24h = calculate_oee(all_events,t_1,t_2,t_2)

        all_e = self.get_queryset()
        serialized_events = EventSerializerRead(all_e,many=True)
        
        from_date = datetime.datetime.strptime(request.GET['created_at__gte'], '%Y-%m-%dT%H:%M:%S')  
        to_date = datetime.datetime.strptime(request.GET['created_at__lte'], '%Y-%m-%dT%H:%M:%S')  
        from_date = timezone.make_aware(from_date)
        
        to_date = timezone.make_aware(to_date)
        now = timezone.now()
        if to_date > now :
            logging.warning('ss')
            to_date = now
        oee_selected_period = calculate_oee(all_e,from_date,to_date,to_date)
        faults = MachineFault.objects.filter(machine__organization=self.request.user.userprofile.organization,\
                                    machine__uuid = machine).\
            select_related('machine','machine__created_by','machine__organization')
        serialized_faults = MachineFaultSerializerRead(faults,many=True)

        cells = Cell.objects.filter(machine__organization=self.request.user.userprofile.organization,\
                                    machine__uuid = machine).\
            select_related('machine','machine__created_by','machine__organization')
        serialized_cells = CellSerializerRead(cells,many=True)
        res = {
            
            'oee_selected_period': oee_selected_period,
            'oee_last_24h':oee_last_24h,
            'events':serialized_events.data,
            'faults':serialized_faults.data,
            'cells':serialized_cells.data
          
        }
        
        
        return Response(res,status=status.HTTP_200_OK)
    
class EventAutoViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [EventPermission]
    def get_queryset(self, *args, **kwargs):
        return Event.objects.filter(machine__organization=self.request.user.userprofile.organization).\
            select_related('machine','machine__organization','cell','fault','product')

    def create(self, request, *args, **kwargs):
        new_state = request.data.get('state')
        machine = request.data.get('machine')
        
        try:
            last_event = Event.objects.filter(machine__uuid=machine).select_related('machine','machine__organization')\
                .order_by('-created_at').first()
            if last_event.machine.organization != self.request.user.userprofile.organization :
                return Response({'detail': 'No!'}, status=status.HTTP_401_UNAUTHORIZED)
            if not last_event:
                return Response({'detail': 'No previous event found'}, status=status.HTTP_400_BAD_REQUEST)
            
            last_state = last_event.state
            if  last_state == new_state and last_state !='report':
                return Response({'detail': 'No state replication allowed'}, status=status.HTTP_400_BAD_REQUEST)
            
            if last_state in allowed_to_skip_fill and last_state in allowed_to_skip_fill[new_state]:
                # Create the new event without filling missing states
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            

            missing_states = get_missing_states(last_state, new_state)
            
            
            if missing_states:
                for state in missing_states:
                    data = request.data.copy()
                    data['state'] = state
                    serializer = self.get_serializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save(created_at=timezone.now(),is_filled=True)

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        except Exception as e:
            
            return   Response({'detail': 'exception'}, status=status.HTTP_400_BAD_REQUEST)