class entrancePoint:
      def __init__(self, id, lng, lat, name, building):
            self.type = 'node'
            self.id = id
            self.lng = lng
            self.lat = lat
            self.tags = {"Entrance" : building}
      def serialize(self):
            dict ={
                  "id" : self.id,
                  "lat" : self.lat,
                  "lon" : self.lng,
                  "tags" : self.tags
            }
            
            return dict
