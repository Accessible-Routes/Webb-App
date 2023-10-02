# import serializer from rest_framework
from rest_framework import serializers
from .models import Room

# create a serializer
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'floor', 'room_name', 'room_type']