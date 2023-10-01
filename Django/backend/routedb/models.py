# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Building(models.Model):
    name = models.CharField(primary_key=True, max_length=64)
    accessible = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'building'

class Entrance(models.Model):
    id = models.CharField(primary_key=True, max_length=64)  # The composite primary key (id, building_name) found, that is not supported. The first column is selected.
    location = models.CharField(max_length=64, blank=True, null=True)
    building_name = models.CharField(max_length=64)
    accessible = models.BooleanField(blank=True, null=True)
    wheelchair_button = models.BooleanField(blank=True, null=True)
    coordinate = models.TextField(blank=True, null=True)  # This field type is a guess.
    interior_coodinate = models.TextField(blank=True, null=True)  # This field type is a guess.
    direction = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'entrance'
        unique_together = (('id', 'building_name'),)
        db_table_comment = 'We could find a better way to identify the doors later (building door)'


class EntranceRoomDoor(models.Model):
    entrance_id = models.CharField(primary_key=True, max_length=64)  # The composite primary key (entrance_id, room_door_accessible_building_door) found, that is not supported. The first column is selected.
    room_door_accessible_building_door = models.CharField(max_length=64)

    class Meta:
        managed = False
        db_table = 'entrance_room_door'
        unique_together = (('entrance_id', 'room_door_accessible_building_door'),)


class Floor(models.Model):
    building_name = models.CharField(primary_key=True, max_length=64)  # The composite primary key (building_name, floor_index) found, that is not supported. The first column is selected.
    floor_index = models.IntegerField()
    path = models.TextField(blank=True, null=True)  # This field type is a guess.
    floor_entrance = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'floor'
        unique_together = (('building_name', 'floor_index'),)


class Room(models.Model):
    floor = models.IntegerField()
    room_number = models.CharField(primary_key=True, max_length=64)  # The composite primary key (room_number, building_name, door_coordinate, floor) found, that is not supported. The first column is selected.
    room_type = models.TextField(blank=True, null=True)  # This field type is a guess.
    door_coordinate = models.TextField()  # This field type is a guess.
    accessible_door = models.BooleanField(blank=True, null=True)
    inside_accessibility = models.BooleanField(blank=True, null=True)
    room_name = models.TextField(blank=True, null=True)  # This field type is a guess.
    building_name = models.CharField(max_length=64)
    tags = models.TextField(blank=True, null=True)  # This field type is a guess.
    min_stairs_needed = models.IntegerField(blank=True, null=True, db_comment='When accessibility is false')

    class Meta:
        managed = False
        db_table = 'room'
        unique_together = (('room_number', 'building_name', 'door_coordinate', 'floor'),)
