import osmnx as ox

north = 42.73201
south = 42.72492
east = -73.67119
west = -73.68663
G = ox.graph_from_bbox(north, south, east, west, network_type = "walk")

Gp = ox.project_graph(G)
Gc = ox.consolidate_intersections(Gp)

# select the first edge
u, v, k = list(Gc.edges)[0]

# inspect this edge's attributes
print(Gc.edges[(u, v, k)])

# what was the original OSM ID of this edge's u and v nodes?
u_original = Gc.nodes[u]['osmid_original']
v_original = Gc.nodes[v]['osmid_original']

# inspect the original edge's attributes
print(G.edges[(u_original, v_original, k)])