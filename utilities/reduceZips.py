import json, sys

# file with the list of zip codes that we are interested in
limitList = [line.strip() for line in open('zipList.txt')]

with open('texas.topo.json') as data_file:    
    data = json.load(data_file)


newGeometries = []
for value in data['objects']['Texas.geo']['geometries']:
  if value['id'] in limitList:
    print value['id']
    newGeometries.append(value)

newData = {}
newData['transform'] = data['transform']
newData['arcs'] = data['arcs']
newData['type'] = data['type']
newData['objects'] = {}
newData['objects']['Texas.geo'] = {}
newData['objects']['Texas.geo']['type'] = data['objects']['Texas.geo']['type']
newData['objects']['Texas.geo']['geometries'] = newGeometries

output = open('bookspring.topo.json', 'w')
output.write(json.dumps(newData))

sys.exit(0)