import json
import math

import geopandas as gpd
import networkx as nx
import osmnx as ox
import pickle
import pandas as pd
from .entrancePoint import entrancePoint


def testPlotRoute(RPI):
      orig = ox.nearest_nodes(RPI, 42.7324294, -73.6905807)
      dest = ox.nearest_nodes(RPI, 42.7338301, -73.6847063)
      #1208042175, "lat": 42.7268945, "lon": -73.6737245
      route = nx.shortest_path(RPI, orig, dest, 'travel_time')
      return route

def closestNode(G, x, y, orig_id):
    min_dist = float('inf')
    closest_node_id = None
    for node in G.nodes:
        tmp_node = G.nodes[node]
        tmp_x = float(tmp_node['x'])
        tmp_y = float(tmp_node['y'])
        tmp_dist = math.sqrt((tmp_y - y)**2 + (tmp_x - x)**2)

        if tmp_dist < min_dist and orig_id != node and tmp_dist != 0.0:
            # print(f"({x}, {y}) : {orig_id} --> ({tmp_x}, {tmp_y}){tmp_dist} --> {node}")
            closest_node_id = node
            min_dist = tmp_dist
    return closest_node_id

def createNodeArray(filename):
      f = open(filename)
      data = json.load(f)
      #add_nulls = lambda number, zero_count : "{0:0{1}d}".format(number, zero_count)
      counter = 0
      nodeArr = []
      for i in data['Entrances']:
            for j in i['Points']:
                  counter += 1
                  buidling = i['NAME']
                  tmp_id = counter#add_nulls(counter, 5)
                  pointName = buidling + str(tmp_id)
                  #print(pointName)
                  lat, lon = j.strip(' ').split(',')
                  #print(float(lon), float(lat))
                  tmp_p = entrancePoint(int(tmp_id), lon, lat, pointName, buidling)
                  nodeArr.append(tmp_p.serialize())
      gdf = gpd.GeoDataFrame(nodeArr)
      return gdf


def plotGraph(new_nodes):
      ox.settings.log_console = False
      ox.settings.use_cache = True
      north = 42.73201
      south = 42.72492
      east = -73.67119
      west = -73.68663
      RPI = ox.graph_from_bbox(north, south, east, west, network_type = "walk")
      RPI = ox.add_edge_speeds(RPI,5)
      RPI = ox.add_edge_travel_times(RPI)
      nodes, edges = ox.graph_to_gdfs(RPI, nodes=True, edges=True)  
      new_node_gdf = gpd.GeoDataFrame(new_nodes)
      new_node_gdf = new_node_gdf.set_crs(4326, allow_override=True)
      nodes = nodes.set_crs(4326, allow_override=True)  
      non_new_nodes = nodes  
      nodes = pd.concat([nodes, new_node_gdf], ignore_index=False)
      entrance_df = nodes[nodes['highway'].str.contains("Entrance", na=False)]
      counter = len(new_nodes)
      new_edge_list = []
      RPI = ox.graph_from_gdfs(nodes, edges)
      for index, row in entrance_df.iterrows():
            tmp_orig_id = int(row['id'])
            tmp_x = float(row['x'])  
            tmp_y = float(row['y'])          
            tmp_dest_id = closestNode(RPI, tmp_x, tmp_y, tmp_orig_id)
            if tmp_orig_id != 33:
                  RPI.add_edge(tmp_dest_id, tmp_orig_id)
                  RPI.add_edge(tmp_orig_id, tmp_dest_id)   
      RPI = ox.add_edge_speeds(RPI,5)   
      G = RPI
      
      with open("graph.p", 'wb') as f:
            pickle.dump(G, f)
      return RPI

def readGraphFromFile():
      with open("routedb/graph.p", 'rb') as f: 
            G_loaded = pickle.load(f)
            return G_loaded

def routemaker(start, end):
      try:
            place = 'Rensselaer Polytechnic Institute'
            new_nodes = createNodeArray('routedb/buildingEntrance.json')
            test = readGraphFromFile()

            nodes, edges = ox.graph_to_gdfs(test, nodes=True, edges=True) 
            entrance_df = nodes[nodes['highway'].str.contains("Entrance", na=False)]
            start_node = int(entrance_df.loc[entrance_df['highway'] == start]['id'].values[0].item())
            end_node = int(entrance_df.loc[entrance_df['highway'] == end]['id'].values[0].item())

            route = nx.shortest_path(test, start_node, end_node, 'travel_time')
      
            route_list = []
            for i in route:
                  node = {}
                  node['latitude'] = test.nodes[i]['y']
                  node['longitude'] = test.nodes[i]['x']
                  route_list.append(node)
            
            return route_list[1:-1]
      except Exception as e:
            print('exception', e)
            return []
      