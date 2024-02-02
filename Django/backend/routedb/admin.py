from django.contrib import admin
from .models import Building, Room, Node, Way

# Register your models here.
admin.site.register(Building)
admin.site.register(Room)
admin.site.register(Node)
admin.site.register(Way)