
from rest_framework import viewsets
from .serializers import OrganizationSerializer,AssetSerializer,\
    MaintenancePlanSerializer,MaintenancePlanSerializerWrite\
    ,UserProfileSerializer
from db.models import Organization,Asset,MaintenancePlan,UserProfile
from django.contrib.auth.models import User
from rest_framework import authentication,status
from rest_framework.response import Response
from django.core.mail import send_mail
from .permissions import OrganizationCreatePermission,\
    AssetsPermission,MaintenancePermission,UserProfilePermission
# Create your views here.
import logging
import uuid,os
from dotenv import load_dotenv
load_dotenv()
class OrganizationViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()
    permission_classes = [OrganizationCreatePermission]

class AssetViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [AssetsPermission]
    def get_queryset(self, *args, **kwargs):
        return Asset.objects.filter(organization=self.request.user.userprofile.organization).\
            select_related('organization','created_by').order_by('-created_at')
    
  

    def create(self,request, *args, **kwargs):
        saved_machines = Asset.objects.filter(organization=self.request.user.userprofile.organization).count()
        if(saved_machines >= self.request.user.userprofile.organization.max_assets):
            return Response({"detail":"You reached your max line possible"},status.HTTP_402_PAYMENT_REQUIRED)
        # request.data["organization"] = request.user.userprofile.organization.uuid
        serialiser = AssetSerializer(data=request.data)
        if serialiser.is_valid():
            machine = serialiser.save(organization = request.user.userprofile.organization ,created_by = self.request.user )
            return Response(serialiser.data,status.HTTP_201_CREATED)
        else :
            return Response(serialiser.errors,status.HTTP_400_BAD_REQUEST)
class MaintenancePlanViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenancePlan
    """
    serializer_class = MaintenancePlanSerializer
    queryset = MaintenancePlan.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes =[MaintenancePermission]
    def get_queryset(self, *args, **kwargs):
        return MaintenancePlan.objects.filter(asset__organization=self.request.user.userprofile.organization).select_related('asset','assigned_to')
    
  
class MaintenanceWritePlanViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenancePlan
    """
    serializer_class = MaintenancePlanSerializerWrite
    queryset = MaintenancePlan.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes =[MaintenancePermission]
    def get_queryset(self, *args, **kwargs):
        return MaintenancePlan.objects.filter(asset__organization=self.request.user.userprofile.organization).select_related('asset','assigned_to')
    
    def create(self,request, *args, **kwargs):
        max_active_orders = MaintenancePlan.objects.filter(asset__organization=self.request.user.userprofile.organization).count()
        if(max_active_orders >= self.request.user.userprofile.organization.max_active_orders):
            return Response({"detail":"You reached your max Orders possible"},status.HTTP_402_PAYMENT_REQUIRED)
        # request.data["organization"] = request.user.userprofile.organization.uuid
        serialiser = MaintenancePlanSerializerWrite(data=request.data)
        if serialiser.is_valid():
            machine = serialiser.save(created_by = self.request.user )
            return Response(serialiser.data,status.HTTP_201_CREATED)
        else :
            return Response(serialiser.errors,status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenancePlan
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [UserProfilePermission]
    def get_queryset(self, *args, **kwargs):
        return UserProfile.objects.filter(organization=self.request.user.userprofile.organization).select_related('user')
    
  

    def create(self,request, *args, **kwargs):

        max_allowed_users = UserProfile.objects.filter(organization=self.request.user.userprofile.organization).count()
        if(max_allowed_users >= self.request.user.userprofile.organization.max_users):
            return Response({"detail":"You reached your max Orders possible"},status.HTTP_402_PAYMENT_REQUIRED)
        
        
        try:
            is_email_exist = UserProfile.objects.filter(user__email=request.data['email']).count()
            if (is_email_exist > 0) :
                return Response({"detail":"E-mail already exist" },status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            return Response({"detail":"Bad Request" },status.HTTP_400_BAD_REQUEST)
        try :
            temp_password = uuid.uuid4()
            subject = "Invitation from: " + str(request.user.first_name) + ' ' + str(request.user.first_name)
            text = "Hello " + request.data['first_name'] + " " + request.data['last_name'] + ",\n"
            text += 'You have been invite to OEE & CMMS Software as a new User.\nYour Username is: ' + request.data['username'] + '\n' +'Temporary password is: ' + str(temp_password)  + '\n'+\
                    'You can access through: localhost\n'
            
            email = request.data['email']
            email_sent = send_mail( subject, text, os.getenv('EMAIL_HOST_USER'), [email] )
            logging.warning(email_sent)

        except Exception as ex:
            return Response({"detail":"Bad Request" },status.HTTP_400_BAD_REQUEST)
        
        
        try:
            user_type=request.data['type'] #make sure that the request has this keyword 

            user = User.objects.create_user(username=request.data['username'],
                                            email=request.data['email'],
                                            password=str(temp_password),
                                            first_name =request.data['first_name'],
                                            last_name =request.data['last_name'],
                                            )
        except Exception as ex:
            return Response({"detail":"Bad Request"},status.HTTP_400_BAD_REQUEST)
        
        try :
            userprofile = UserProfile.objects.create(type=user_type,user=user, organization=request.user.userprofile.organization)
            serialiser = UserProfileSerializer(userprofile)
            return Response(serialiser.data,status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"detail":"Bad Request" },status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if(instance.user == request.user):
            return Response({"detail":"You cannot delete your own user"},status.HTTP_400_BAD_REQUEST)
        if(instance.user.userprofile.organization == request.user.userprofile.organization):
            
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
            
        return Response({"detail":"You cannot delete outside of your organization"},status.HTTP_401_UNAUTHORIZED)

class MyMaintenancePlanViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenancePlan
    """
    serializer_class = MaintenancePlanSerializer
    queryset = MaintenancePlan.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes =[MaintenancePermission]
    def get_queryset(self, *args, **kwargs):
        return MaintenancePlan.objects.filter(asset__organization=self.request.user.userprofile.organization,\
                                              assigned_to=self.request.user)\
                                                .exclude(status='Completed')\
                                                .exclude(status='Cancelled').select_related('asset','assigned_to')

class MyProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing MaintenancePlan
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [UserProfilePermission]
    def get_queryset(self, *args, **kwargs):
        return UserProfile.objects.filter(user=self.request.user).select_related('user')
    