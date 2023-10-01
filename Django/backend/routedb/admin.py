from django.contrib import admin
from .models import Building, Entrance, EntranceRoomDoor, Floor, Room

# Register your models here.
admin.site.register(Building)
admin.site.register(Entrance)
admin.site.register(EntranceRoomDoor)
admin.site.register(Floor)
admin.site.register(Room)