from shapely.geometry import  Point
import geopandas as gpd
import pandas as pd
import numpy as np

class entrancePoint:
      def __init__(self, id, lng, lat, name, building):
            self.type = 'node'
            self.id = id
            self.lng = lng
            self.lat = lat
            self.tags = {"Entrance" : building + ' Entrance'}
      def serialize(self):
            dict ={
                  'id' : id,
                  'y' : self.lat,
                  'x' : self.lng,
                  'highway' : self.tags['Entrance'],
                  'street_count' : 1,
                  'geometry' : Point(self.lat, self.lng),
                  'osmid' : self.id
            }
            return dict
