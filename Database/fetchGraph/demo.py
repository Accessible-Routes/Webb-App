import matplotlib.pyplot as plt
import networkx as nx
import osmnx as ox
import json

def testPlotRoute(RPI):
      orig = ox.nearest_nodes(RPI, 42.7324294, -73.6905807)
      dest = ox.nearest_nodes(RPI, 42.7338301, -73.6847063)
      #1208042175, "lat": 42.7268945, "lon": -73.6737245
      route = nx.shortest_path(RPI, orig, dest, 'travel_time')
      print(route)
      #route_map = ox.plot_route_folium(RPI, route)
      #route_map.save('test.html')
      return route
def addNodes(filename):
      f = open(filename)
      data = json.load(f)
      add_nulls = lambda number, zero_count : "{0:0{1}d}".format(number, zero_count)
      counter = 0
      for i in data['Entrances']:
            for j in i['Points']:
                  counter += 1
                  name = i['NAME']
                  tmp_id = add_nulls(counter, 5)
                  pointName = name + str(tmp_id)
                  print(pointName)
                  lon, lat = j.strip(' ').split(',')
                  print(float(lon), float(lat))
      # '001': 
      #       {
      #             'y': 7.367210, 
      #             'x': 151.838487,
      #             'street_count': 1
      #       }
      # }
      return 0


def plotGraph():
      #ox.config(use_cache=True, log_console=False)
      ox.settings.log_console = False
      ox.settings.use_cache = True
      # RPI = ox.graph_from_place('Troy, NY', network_type="walk")
      # RPI = ox.speed.add_edge_speeds(RPI)
      # RPI = ox.speed.add_edge_travel_times(RPI)
      #point1 = "lat": 42.7334294, "lon": -73.6905807
      #point2 = "lat": 42.7338301, "lon": -73.6887063
      north = 42.73201
      south = 42.72492
      east = -73.67119
      west = -73.68663
      RPI = ox.graph_from_bbox(north, south, east, west, network_type = "walk")
      RPI = ox.add_edge_speeds(RPI,5)
      RPI = ox.add_edge_travel_times(RPI)

      origin_node = ox.nearest_nodes(RPI, north, south)
      destination_node = list(RPI.nodes())[-1]
      shortest_path = nx.shortest_path(RPI,origin_node,destination_node) 
      for u, v in zip(shortest_path[0:], shortest_path[1:]):
            edge_data = RPI.get_edge_data(u, v)
            min_weight = min([edge_data[edge]['length'] for edge in edge_data])
            print(f"{u}---({min_weight})---{v}")
      
      ox.plot.plot_graph_route(RPI,shortest_path)
      return RPI

def weight(RPI):
      RPI = ox.graph_to_gdfs(RPI, nodes=True, edges=True)
      #RPI['weight'] = 1.0
      return RPI


def customNodeCreator(filename):
      nodeDict = {}

      return nodeDict


#place = 'Rensselaer Polytechnic Institute'
#test = plotGraph().edges(data=True)
addNodes('Database/fetchGraph/buildingEntrance.json')

# for u, v, highway in RPI.edges(highway='highway'):
      #       if highway != 'footpath' or highway != 'path': 
      #             RPI.remove_edge(u, v)

      #print(RPI.edges)
      #fig, ax = ox.plot_graph(RPI, bbox=(north, south, east, west), edge_color = 'g', node_color='b')
      
'''
{
      "Entrances" : 
      [
            {
                  "NAME" : "Rensselaer Union", 
                  "Points": ["42.73008909771817, -73.67704454765556", "42.72986744543403, -73.67709148631033"]
            },
            {
                  "NAME" : "CBIS", 
                  "Points" : ["42.7280194663293, -73.67837529170055"]
            },
            {
                  "NAME" : "RPI Playhouse", 
                  "Points": ["42.7291677088131, -73.67797446087425"]
            },
            {
                  "NAME" : "Academy Hall", 
                  "Points" : ["42.727594996082445, -73.67877098483189", "42.727406830406196, -73.67853092714033"]
            },
            {
                  "NAME" : "Sage dining Hall" ,
                  "Points": ["42.72961158163338, -73.67811398380265"]
            },
            {
                  "NAME" : "87 Gym" , 
                  "Points" :["42.73069362735673, -73.67893406504051"]
            },
            {
                  "NAME" : "Ricketts",
                  "Points" : ["42.731028834936374, -73.68003372882379"]
            },
            {
                  "NAME" : "Troy Building",
                  "Points" : ["42.73094387705421, -73.68058770013498", "42.73109558318403, -73.68041067434208"]
            },
            {
                  "NAME" : "Sage Labs",
                  "Points" :  ["42.730765480933485, -73.68167733541351", "42.73098811511924, -73.6811509518876"]
            },
            {
                  "NAME" : "DCC",
                  "Points" : ["42.72985060400276, -73.67950427536064", "42.72940825115112, -73.67958095188204"] 
            },
            {
                  "NAME" : "Low",
                  "Points" : ["42.729498136339146, -73.67838850778122"] 
            },
            {
                  "NAME" : "JEC",
                  "Points" : ["42.72966163418423, -73.67965642486313"]
            },
            {
                  "NAME" : "JROWL",
                  "Points" : ["42.728354027584466, -73.68051256452605", "42.72890209771069, -73.68020399822392"]
            },
            {
                  "NAME" : "VCC",
                  "Points" : ["42.72929467529175, -73.68221647357326"]
            },
            {
                  "NAME" : "Folsom Library",
                  "Points" : ["42.72937890018547, -73.68241790188574"]
            },
            {
                  "NAME" : "Greene Building",
                  "Points" : ["42.729891792437606, -73.68086878731187", "42.73011738511107, -73.68114572537503"]
            },
            {
                  "NAME" : "Amos Eaton",
                  "Points" : ["42.730198618376356, -73.68284716687016"]
            },
            {
                  "NAME" : "Lally",
                  "Points" : ["42.73013834900463, -73.68189151650563"]
            },
            {
                  "NAME" : "Walker Labs",
                  "Points" : ["42.7307475293064, -73.68241334334832"]
            },
            {
                  "NAME" : "Cogswell Labs",
                  "Points" : ["42.72831706292051, -73.6811600143054"]
            },
            {
                  "NAME" : "EMPAC",
                  "Points" : ["42.72886165658477, -73.68332059485383"]
            },
            {
                  "NAME" : "Carnegie",
                  "Points" : ["42.730515354781396, -73.68331526803681", "42.730415837049144, -73.68306538178464"]
            },
            {
                  "NAME" : "Pittsburg",
                  "Points" : ["42.731021303557796, -73.68333244233531"]
            },
            {
                  "NAME" : "West Hall",
                  "Points" : ["42.73166096445073, -73.68276797289366"]
            },
            {
                  "NAME" : "Commons dining hall",
                  "Points" : ["42.72844630836017, -73.67450286751094"]
            }
      ]
}
'''
