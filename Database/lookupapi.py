import psycopg2

"""
Returns true if room is 100% accessible (ie inside_accessibility and door
        accessibility are both TRUE)
Returns -1 if any error (ie the room is not found)

building = building name ex: 'Amos Eaton'. building is not case sensitive
room = room number ex: 216. Should be a string, even if the room number
        is all numbers
floor = floor number, should be int
"""
def lookup_room_acc_all(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT inside_accessibility FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + str(floor) + "';")
    insacctmp =  cur.fetchall()
    if(len(insacctmp) < 1):
        print("ERROR: data not found")
        return -1
    insacc = insacctmp[0][0]
    cur.execute("SELECT accessible_door FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + str(floor) + "';")
    toroomtmp =  cur.fetchall()
    if(len(toroomtmp) < 1):
        print("ERROR: data not found")
        return -1
    toroom = toroomtmp[0][0]
    return insacc and toroom 
    
def lookup_room_inside(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT inside_accessibility FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + str(floor) + "';")
    #print(cur.fetchall())
    insacctmp =  cur.fetchall()
    if(len(insacctmp) < 1):
        print("ERROR: data not found")
        return -1
    insacc = insacctmp[0][0]  
    return insacc
    
def lookup_room_door(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT accessible_door FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + str(floor) + "';")
    tmp = cur.fetchall()
    if(len(tmp) < 1):
        print("ERROR: data not found")
        return -1
    final = True
    for i in range(len(tmp)):
        if(tmp[i] == False):
            final = False
            break
    #print(cur.fetchall())
    return final
    
def lookup_min_stairs(building, room, floor):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT min_stairs FROM (SELECT * FROM room WHERE lower(building_name) = '" + building + "') a WHERE room_number= '" + room + "' AND floor = '" + str(floor) + "';")
    return cur.fetchall()
    
def lookup_door_acc(building, room ):
    conn = psycopg2.connect("dbname=routes user=routes password=routes")
    cur = conn.cursor()
    cur.execute("SELECT accessible door FROM room ")
    return cur.fetchall()


if __name__ == '__main__':
    
    print(lookup_room_acc_all('amos eaton', '216', 2))
    print(lookup_room_acc_all('amos eaton', '218', 2))
    print(lookup_room_inside('amos eaton', '216', 2))
    print(lookup_room_door('amos eaton', '214', 2))