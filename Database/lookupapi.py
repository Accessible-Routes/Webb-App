import psycopg2


def lookup_room_acc(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT accessibility FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + floor + "';")
    #print(cur.fetchall())
    return cur.fetchall*()
    
def lookup_room_inside(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT inside_accessibility FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + floor + "';")
    #print(cur.fetchall())
    return cur.fetchall()
    
def lookup_doors(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT accessible door FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + floor + "';")
    #print(cur.fetchall())
    return cur.fetchall()
    
def lookup_min_stairs(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT min_stairs FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + floor + "';")
    return cur.fetchall()
    
def lookup_door_acc(building, room ):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT accessible door FROM room ")
    return cur.fetchall()


    
if __name__ == '__main__':
    
    """conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT a.movieid id, title, 'movie' as streamingtype FROM (SELECT movieid FROM moviesgenres WHERE lower(genre) = 'animation' except SELECT movieid FROM moviesgenres WHERE lower(genre) = 'horror') AS a INNER JOIN movies ON a.movieid = movies.movieid UNION SELECT DISTINCT a.seriesid id, title, 'series' as streamingtype FROM (SELECT seriesid FROM seriesgenres WHERE lower(genre) = 'animation' EXCEPT SELECT seriesid FROM seriesgenres WHERE lower(genre) = 'horror') AS a INNER JOIN series ON a.seriesid = series.seriesid ORDER BY title DESC, streamingtype ASC, id ASC;")
    print(cur.fetchall())"""
    #lookup_room('amos eaton', '216', '100')
    
    """
    SELECT * FROM (SELECT * FROM room WHERE lower(building_name) = 'amos eaton') a WHERE room_number= '216';
    """