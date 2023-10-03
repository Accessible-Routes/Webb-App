# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import uuid

class Building(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    name = models.TextField(blank=True, null=True)
    accessible = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = 'building'

class Room(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    room_number = models.CharField(max_length=64) 
    room_type = models.TextField(blank=True, null=True)  # This field type is a guess.
    
    room_name = models.TextField(blank=True, null=True)  # This field type is a guess.
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    stairs = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    ramps = models.BooleanField(default=False)
    #rooms connected
    #add field to show what other rooms its connected to.

    tags = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        db_table = 'room'

class RoomConnection(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    room1 = models.ForeignKey(Room, on_delete=models.CASCADE)
    room2 = models.ForeignKey(Room, on_delete=models.CASCADE)
