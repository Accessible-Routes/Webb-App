from shapely.geometry import  Point
import geopandas as gpd

class entrancePoint:
      def __init__(self, id, lng, lat, name, building):
            self.type = 'node'
            self.id = id
            self.lng = lng
            self.lat = lat
            self.tags = {"Entrance" : building}
      def serialize(self):
            dict ={
                  "osmid" : self.id,
                  'geometry' : Point(self.lng, self.lat),
                  "y" : self.lat,
                  "x" : self.lng,
                  "tags" : self.tags
            }
            return dict
