"""Serializers of the app"""
from rest_framework import serializers
from db.models import Organization,Asset,MaintenancePlan,UserProfile


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer"""
    class Meta:
        model = Organization
        exclude = []
class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer"""
    class Meta:
        model = UserProfile
        exclude = []
        depth=1

class AssetSerializer(serializers.ModelSerializer):
    """Serializer"""
    class Meta:
        model = Asset
        exclude = []
        depth= 2
class MaintenancePlanSerializer(serializers.ModelSerializer):
    """Serializer"""
    class Meta:
        model = MaintenancePlan
        exclude = []
        depth= 2
class MaintenancePlanSerializerWrite(serializers.ModelSerializer):
    """Serializer"""
    class Meta:
        model = MaintenancePlan
        exclude = []

