import json, sys


# file with the list of zip codes that we are interested in
limitList = [line.strip() for line in open('zipList.txt')]
limitTown = []
for x in range(len(limitList)):
  locationArray = limitList[x].split(',')
  limitList[x] = locationArray[0]
  limitTown.append(locationArray[1])

with open('texas.topo.json') as data_file:    
    data = json.load(data_file)


newGeometries = []
for value in data['objects']['Texas.geo']['geometries']:
  if value['id'] in limitList:
    value['town'] = limitTown[limitList.index(value['id'])]
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