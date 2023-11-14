from django.test import TestCase
from django.urls import reverse
from .models import Building, Room
from django.test import Client
import json

# Create your tests here.
class AllBuildingViewTest(TestCase):
    def test_no_buildings(self):
        call = reverse('all-buildings')

        response = self.client.get(call)
        assert(response.status_code==200)

    def test_building_creation(self):
        Building.objects.create(name='Sage')
        call = reverse('all-buildings')

        response = self.client.get(call)
        assert(response.status_code==200)
        data = json.loads(response.content)
        assert(data[0]['Name'] == 'Sage')

    def test_multiple_buildings(self):
        Building.objects.create(name = 'Sage')
        Building.objects.create(name = 'DCC')
        Building.objects.create(name = 'Ricketts')
        call = reverse('all-buildings')

        response = self.client.get(call)
        assert(response.status_code==200)
        data = json.loads(response.content)
        assert(len(data) == 3)
        
class AllRoomViewTest(TestCase):
    def test_no_building(self):
        call = reverse('all-rooms')

        response = self.client.get(call)
        assert(response.status_code==200)
    
    def test_no_rooms(self):
        Building.objects.create()
        call = reverse('all-rooms')

        response = self.client.get(call)
        assert(response.status_code==200)

    def test_one_rooms(self):
        sage = Building.objects.create(name = 'Sage')
        Room.objects.create(building = sage, room_number = 3303)
        call = reverse('all-rooms')

        response = self.client.get(call)
        assert(response.status_code==200)
        data = json.loads(response.content)
        assert(data['Sage'][0]['Number'] == 3303)

    def test_multiple_rooms_buildings(self):
        sage = Building.objects.create(name = 'Sage')
        dcc = Building.objects.create(name = 'DCC')
        Building.objects.create(name = 'Ricketts')
        Room.objects.create(building = sage, room_number = 3303)
        Room.objects.create(building = sage, room_number = 2201)
        Room.objects.create(building = dcc, room_number = 330)
        Room.objects.create(building = dcc, room_number = 308)
        Room.objects.create(building = dcc, room_number = 324)

        call = reverse('all-rooms')

        response = self.client.get(call)
        assert(response.status_code==200)
        data = json.loads(response.content)
        assert(data['Sage'][0]['Number'] == 3303)
        assert(data['Sage'][1]['Number'] == 2201)
        assert(data['DCC'][0]['Number'] == 330)
        assert(data['DCC'][1]['Number'] == 308)
        assert(data['DCC'][2]['Number'] == 324)