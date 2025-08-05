from django.urls import path, include
from .views import UserProfileView,ChangePassword



urlpatterns = [

    path('profile/',UserProfileView.as_view(),name='profile-view'),
    path('password',ChangePassword.as_view(),name='password-view'),

]