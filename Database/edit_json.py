import json

def read_json(JSON_File):
    count = 0
    for i in JSON_File['elements']:
        try:
            print("ID: ", i["id"], "\t|\t", "Tags: ", i["tags"])
        except KeyError:
            print("ID: ", i["id"], "\t|\t", "Tags: None")
            # continue
        count += 1
    f.close()
    return count


def new_JSON(JSON_file):
    # f = open(JSON_file)
    f = open("new_file.json", "w")

    for a in data['elements']:




filename = '4645508147a65be4e31c1cce9ade2840c6ac334f.json';
f = open(filename)
data = json.load(f)
orig_count = read_json(filename)

print("There are ", orig_count, " elements in this json.")