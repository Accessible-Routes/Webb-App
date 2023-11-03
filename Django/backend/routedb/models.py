from django.db import models
import uuid

class Building(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    name = models.TextField(blank=True, null=True)
    accessible = models.BooleanField(default=False)

    lat = models.DecimalField(max_digits=28, decimal_places=25, default=0.0)
    long = models.DecimalField(max_digits=28, decimal_places=25, default=0.0)
    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'building'

#"Rooms" can be stairs, elevators, or ramps and connect actual rooms
class Room(models.Model):
    id = models.UUIDField(primary_key=True, unique=True, blank=False, default=uuid.uuid4)
    room_number = models.IntegerField(blank=True, null=True, default=-1)
    
    class RoomType(models.TextChoices):
        CLASS_ROOM = 'CLASS_ROOM'
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

class Node(models.Model):
    id = models.BigIntegerField(primary_key=True, unique=True, blank=False)
    lat = models.DecimalField(max_digits=28, decimal_places=25, default=0.0)
    long = models.DecimalField(max_digits=28, decimal_places=25, default=0.0)
    
    def __str__(self):
        return f'{self.id}'

class Way(models.Model):
    id = models.BigIntegerField(primary_key=True, unique=True, blank=False)
    nodes = models.ManyToManyField(Node)

    def __str__(self):
        return f'{self.id}'