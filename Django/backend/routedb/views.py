from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.response import Response
from .models import Room, Building
from django.http import JsonResponse

# Create your views here.
class AllBuildingView(APIView):
    def get(self, request):
        buildings = Building.objects.all()
        building_list = []
        for building in buildings:
            temp_json = {}
            temp_json['Name'] = building.name
            temp_json['UUID'] = building.id
            building_list.append(temp_json)
        return JsonResponse(building_list, safe=False, status=200)

class AllRoomView(APIView):
    def get(self, request):
        
        room_json = {}
        buildings = Building.objects.all()
        for building in buildings:
            room_json[building.name] = []
            rooms = Room.objects.filter(building = building)

            for room in rooms:
                room_dict = {}
                room_dict['Number'] = room.room_number
                room_dict['UUID'] = room.id

                # Depending on what we want, we can give the connections for each room.
                # room_dict['Connections'] = []
                # for connect in room.connected_rooms.all():
                #     room_dict['Connections'].append(connect.id)

                room_json[building.name].append(room_dict)

        return JsonResponse(room_json, status=200)

class RoomAccessibleView(APIView):
    
    def get(self, request, room_id):
        try:
            room = Room.objects.get(id=room_id)            
        except:
            return JsonResponse({'message':'No Room Found.'},status=404)
        
        room_json = {}
        room_json['UUID'] = room.id
        room_json['Number'] = room.room_number
        room_json['Building'] = room.building.name
        room_json['Accessible'] = room.accessible
        room_json['Room Type'] = room.room_type
        room_json['Connections'] = []
        for connect in room.connected_rooms.all():
            room_json['Connections'].append(connect.id)

        return JsonResponse(room_json,status=200)
    
class RoomCreationView(APIView):
    permission_classes = [HasAPIKey]
    def post(self, request):
        data = request.data
        name = data.get('Name','')
        number = data.get('Number')
        building = data.get('Building')
        accessible = data.get('Accessible', False)
        connections = data.getlist('Connections')

        if len(connections) == 0:
            return Response('Invalid Form Data', status=404)
        
        if not number or not building or not connections:
            return Response('Invalid Form Data', status=404)
        
        try:
            building = Building.objects.get(name = building)
        except:
            return Response('Invalid Form Data', status=404)

        new_room = Room(building=building, room_name=name, room_number=number, accessible=accessible)

        if len(connections) == 1 and connections[0] == '':
            return Response('Successfully created room', status=200)
        
        for room in connections:
            try:
                room = Room.objects.get(id = room)
            except:
                return Response('Invalid Form Data', status=404)
        
        new_room.save()
        for room in connections:
            room = Room.objects.get(id = room)
            new_room.connected_rooms.add(room)
            room.connected_rooms.add(new_room)
            
        return Response('Successfully created room', status=200)

class RoomEditView(APIView):
    permission_classes = [HasAPIKey]
    def post(self, request):
        data = request.data
        name = data.get('Name','')
        number = data.get('Number')
        building = data.get('Building')
        accessible = data.get('Accessible', False)
        connections = data.getlist('Connections')