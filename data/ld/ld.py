import json
from pyld import jsonld

f0 = open('wall_door.json')
doc = json.load(f0)

f1 = open('wall_door_framing.json')
frame = json.load(f1)

framed = jsonld.frame(doc, frame)



print(framed)


f0.close()
f1.close()
