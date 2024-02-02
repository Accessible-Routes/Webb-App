from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.response import Response
from .models import Room, Building, Node, Way
from django.http import JsonResponse
from random import randrange, uniform
from .coppyGenerate import routemaker, plotGraph

# Create your views here.
class AllBuildingView(APIView):
    def get(self, request):
        buildings = Building.objects.all()
        building_list = []
        for building in buildings:
            temp_json = {}
            temp_json['Name'] = building.name
            temp_json['UUID'] = building.id
            temp_json['latitude'] = building.lat
            temp_json['longitude'] = building.long
            temp_json['accessible'] = building.accessible

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
            return Response('Invalid Form Data', status=400)
        
        if not number or not building or not connections:
            return Response('Invalid Form Data', status=400)
        
        try:
            building = Building.objects.get(name = building)
        except:
            return Response('Invalid Form Data', status=400)

        new_room = Room(building=building, room_name=name, room_number=number, accessible=accessible)

        if len(connections) == 1 and connections[0] == '':
            return Response('Successfully created room', status=200)
        
        for room in connections:
            try:
                room = Room.objects.get(id = room)
            except:
                return Response('Invalid Form Data', status=400)
        
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

        uuid = data.get('UUID')
        try:
            room = Room.objects.get(id = uuid)
        except:
            return Response(f'Room with uuid:{uuid} does not exist', status=404)
        
        number = data.get('Number', None)
        if number is not None:
            number = int(number)
            room.room_number = number
        
        room_type = data.get('Room_Type', None)

        flag = False
        if room_type is None:
            flag = True

        for item in Room.RoomType.choices:
            if room_type == item[0]:
                flag = True
        
        if not flag:
            return Response(f'Invalid Room Type Data', status=400)
        
        building_id = data.get('Building', None)
        try:
            building = Building.objects.get(id=building_id)
            room.building = building
        except:
            return Response(f'Building with uuid:{building_id} does not exist', status=404)
        
        stairs = data.get('Stairs', None)
        if stairs is not None:
            if stairs == 'true':
                room.stairs = True
                print('true')
            elif stairs == 'false':
                room.stairs = False
                print('false')
            else:
                return Response(f'Invalid Room Stairs Data', status=400)
        
        elevator = data.get('Elevator', None)
        if elevator is not None:
            if elevator == 'true':
                room.elevator = True
                print('true')
            elif elevator == 'false':
                room.elevator = False
                print('false')
            else:
                return Response(f'Invalid Room Elevator Data', status=400)
        
        ramps = data.get('Ramps', None)
        if ramps is not None:
            if ramps == 'true':
                room.ramps = True
                print('true')
            elif ramps == 'false':
                room.ramps = False
                print('false')
            else:
                return Response(f'Invalid Room Ramps Data', status=400)

        accessible = data.get('Accessible', None)
        if accessible is not None:
            if accessible == 'true':
                room.accessible = True
                print('true')
            elif accessible == 'false':
                room.accessible = False
                print('false')
            else:
                return Response(f'Invalid Room Accessible Data', status=400)

        tags = data.get('Tags', None)
        if tags is not None:
            room.tags = tags

        connections = data.getlist('Connections', None)
        if connections is None:
            return Response(f'Successfully editted room', status=200)
        
        for connection in connections:
            try:
                Room.objects.get(id=connection)
            except:
                return Response(f'Room with uuid:{connection} does not exist', status=404)
        
        for connect in room.connected_rooms.all():
            connected_room = Room.objects.get(id=connect.id)
            connected_room.connected_rooms.remove(room)
            connected_room.save()
            room.connected_rooms.remove(connected_room)
            room.save()
        
        for connection in connections:
            connected_room = Room.objects.get(id=connection)
            connected_room.connected_rooms.add(room)
            connected_room.save()
            room.connected_rooms.add(connected_room)
            room.save()

        return Response(f'Successfully editted room', status=200)

# There are assumptions about the json request data such as nodes coming first then ways
class NodeRecreateView(APIView):
    permission_classes = [HasAPIKey]
    def post(self, request):
        data = request.data
        elements = data.get('elements')
        Node.objects.all().delete()
        Way.objects.all().delete()
        for element in elements:
            new_node = Node()
            if element['type'] == 'node':
                new_node.id = element['id']
                new_node.lat = element['lat']
                new_node.long = element['lon']
                new_node.save()
            new_way = Way()
            if element['type'] == 'way':
                new_way.id = element['id']
                nodes = element['nodes']
                new_way.save()
                for node in nodes:
                    current_node = Node.objects.get(id=node)
                    new_way.nodes.add(current_node)
                    new_way.save()
                    current_node.save()

        return Response(f'Successfully Recreated Nodes and Edges', status=200)

class OutdoorRouteView(APIView):
    def get(self, request):
        data = request.GET

        start_name = data.get('starting_location', None)
        end_name = data.get('ending_location', None)

        if not start_name or not end_name:
            return Response(f'Invalid Building Data', status=400)
        
        try:
            start_building = Building.objects.get(id = start_name)
            end_building = Building.objects.get(id = end_name)
        except:
            return Response(f'Invalid Room Accessible Data', status=400)
        
        response_dict = {}
        response_dict['buildings'] = [{},{}]

        # Data for building 1
        response_dict['buildings'][0] = {}
        response_dict['buildings'][0]['title'] = start_building.name
        response_dict['buildings'][0]['location_type'] = 'start'
        response_dict['buildings'][0]['latitude'] = start_building.lat
        response_dict['buildings'][0]['longitude'] = start_building.long

        # Data for building 2
        response_dict['buildings'][1] = {}
        response_dict['buildings'][1]['title'] = end_building.name
        response_dict['buildings'][1]['location_type'] = 'end'
        response_dict['buildings'][1]['latitude'] = end_building.lat
        response_dict['buildings'][1]['longitude'] = end_building.long
        
        # Data for route routing from start to end building
        start = "Entrance_" + start_building.name
        end = "Entrance_" + end_building.name 
        route = routemaker(start,end)
        response_dict['route'] = route
        response_dict['found'] = True
        if not route:
            response_dict['found'] = False

        #Returns JSON data
        return JsonResponse(response_dict, status=200)
