from rest_framework import serializers
from .models import Event,MachineEvent,MachineFault,Cell,Product
from db.models import Asset


class AssetEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        exclude = ['created_by','organization']

class MachineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineEvent
        exclude = []

class MachineFaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineFault
        exclude = []
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = []
class CellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cell
        exclude = []

class MachineFaultSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = MachineFault
        exclude = []
        depth = 2
class EventSerializerRead(serializers.ModelSerializer):
    machine= AssetEventSerializer()
    class Meta:
        model = Event
        exclude = []
        depth = 2
class CellSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = Cell
        exclude = []
        depth = 2
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = []
        

