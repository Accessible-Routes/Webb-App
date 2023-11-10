import matplotlib.pyplot as plt
import networkx as nx
import osmnx as ox
import json
from entrancePoint import entrancePoint
import geopandas as gpd
from shapely.geometry import  Point
import pandas as pd
import geopandas as gpd

def testPlotRoute(RPI):
      orig = ox.nearest_nodes(RPI, 42.7324294, -73.6905807)
      dest = ox.nearest_nodes(RPI, 42.7338301, -73.6847063)
      #1208042175, "lat": 42.7268945, "lon": -73.6737245
      route = nx.shortest_path(RPI, orig, dest, 'travel_time')
      print(route)
      #route_map = ox.plot_route_folium(RPI, route)
      #route_map.save('test.html')
      return route
def createNodeArray(filename):
      f = open(filename)
      data = json.load(f)
      add_nulls = lambda number, zero_count : "{0:0{1}d}".format(number, zero_count)
      counter = 0
      nodeArr = []
      for i in data['Entrances']:
            for j in i['Points']:
                  counter += 1
                  buidling = i['NAME']
                  tmp_id = add_nulls(counter, 5)
                  pointName = buidling + str(tmp_id)
                  #print(pointName)
                  lon, lat = j.strip(' ').split(',')
                  #print(float(lon), float(lat))
                  tmp_p = entrancePoint(tmp_id, lon, lat, pointName, buidling)
                  nodeArr.append(tmp_p.serialize())


      # '001': 
      #       {
      #             'y': 7.367210, 
      #             'x': 151.838487,
      #             'street_count': 1
      #       }
      # }
      gdf = gpd.GeoDataFrame(nodeArr)
      return gdf


def plotGraph(new_nodes):
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
            #print(f"{u}---({edge_data, min_weight})---{v}")
      nodes, edges = ox.graph_to_gdfs(RPI, nodes=True, edges=True)      
      new_node_gdf = gpd.GeoDataFrame(new_nodes)
      nodes = pd.concat([nodes, new_node_gdf], ignore_index=True)
      #print(nodes.loc[nodes['highway'] == 'custom_entrance'])
      RPI = ox.graph_from_gdfs(nodes, edges)
      #graph_attrs = {'crs': 'epsg:4326', 'simplified': True}
      ox.plot.plot_graph_route(RPI,shortest_path)#, graph_attrs)
      return RPI

def weight(RPI):
      RPI = ox.graph_to_gdfs(RPI, nodes=True, edges=True)
      return RPI
def addNodes(RPI, filename):
      tmp_list = createNodeArray(filename)

      my_nodes = gpd.GeoDataFrame(tmp_list)
      return RPI


place = 'Rensselaer Polytechnic Institute'
new_nodes = createNodeArray('Database/fetchGraph/buildingEntrance.json')
test = plotGraph(new_nodes).edges(data=True)

#for i in arr:
#      print(i.serialize())
# for u, v, highway in RPI.edges(highway='highway'):
      #       if highway != 'footpath' or highway != 'path': 
      #             RPI.remove_edge(u, v)

      #print(RPI.edges)
      #fig, ax = ox.plot_graph(RPI, bbox=(north, south, east, west), edge_color = 'g', node_color='b')
      