from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer
from db.models import UserProfile,Organization
from rest_framework import status
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
import logging
class UserProfileView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = []
    

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        profile = UserProfile.objects.get(user=request.user)
        ser = UserProfileSerializer(profile)
       
        return Response(ser.data,status=status.HTTP_200_OK)
    def post(self,request,format=None):
        
       
        try:
            email = request.data["email"]
            if (User.objects.filter(email=email).count()):
                data = {"detail":"E-mail already exist"}
                return Response(data,status=status.HTTP_400_BAD_REQUEST)
            username = request.data["username"]
            password_1 = request.data["password"]
            
            organization_name = request.data['organization']
        except Exception as ex :
            
            data = {"detail":"Error while creating22" + ex.__str__()}
            logging.warning(ex)
            return Response(data,status=status.HTTP_400_BAD_REQUEST)
         #first check that the username is valid
        if request.data["password"] != request.data["password2"]:
            data = {"detail":"Password doesn't match"}
            return Response(data,status=status.HTTP_400_BAD_REQUEST)
        try :
            validate_password(password_1)
        except Exception :
            data = {"detail":"Password too weak"}
            return Response(data,status=status.HTTP_400_BAD_REQUEST)
        try:
            user_n = User.objects.create_user(username=username,
                                 email=email)
            user_n.set_password(password_1)
            user_n.save()
        except Exception :
            data = {"detail":"An error occured while creating a user, Hint Change username"}
            return Response(data,status=status.HTTP_400_BAD_REQUEST)
        
        #create an organization and a profile
        try :
            
            organization = Organization.objects.create(name= organization_name)
            organization.save()
        except Exception :
            user_n.delete()
            data = {"detail":"An error occured while creating an organization"}
            return Response(data,status=status.HTTP_400_BAD_REQUEST)
        try:
            profile = UserProfile.objects.create(user=user_n,organization=organization)
        except Exception :
            user_n.delete()
            organization.delete()
            data = {"detail":"An error occured while creating a user profile"}
            return Response(data,status=status.HTTP_400_BAD_REQUEST)

        return Response({},status=status.HTTP_201_CREATED)

class ChangePassword(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    def post(self,request):

        try:
            
            if request.data['password_1'] != request.data['password_2'] or request.data['password_1'] =="" or request.data['password_2']=='' :
                return Response({'detail':'password does not match'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'detail':'Missing informations'}, status=status.HTTP_400_BAD_REQUEST)
        try :
            user = authenticate(username=request.user.username,password=request.data['password'])
            if user is None:
                return Response({'detail':'Wrong password'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception :
            return Response({'detail':'Wrong password'}, status=status.HTTP_400_BAD_REQUEST)
        try :
            user = User.objects.get(id = request.user.id)
            user.set_password(request.data['password_1'])
            user.save()
            return Response({'success':'updated'}, status=status.HTTP_200_OK)
        except Exception as e :
            return Response({'problem_source':'password does not match'}, status=status.HTTP_400_BAD_REQUEST)