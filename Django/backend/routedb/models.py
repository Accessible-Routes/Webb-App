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

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'building'

#"Rooms" can be stairs, elevators, or ramps and connect actual rooms
class Room(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    room_number = models.IntegerField(blank=True, null=True, default=-1)
    
    class RoomType(models.TextChoices):
        CLASS_ROOM = 'CLASSROOM'
        LECTURE_HALL = 'LECTURE_HALL'
        HALLWAY = 'HALLWAY'
        UNSPECIFIED = 'UNSPECIFIED'

    room_type = models.TextField(choices=RoomType.choices, default=RoomType.UNSPECIFIED)  
    
    room_name = models.TextField(blank=True, null=True)  
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    stairs = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    ramps = models.BooleanField(default=False)

    accessible = models.BooleanField(default=False)
    #rooms connected
    #add field to show what other rooms its connected to.

    tags = models.TextField(blank=True, null=True) 
    connected_rooms = models.ManyToManyField("self", blank=True)

    def __str__(self):
        return f'{self.room_name} {self.room_number}'
    
    class Meta:
        db_table = 'room'

