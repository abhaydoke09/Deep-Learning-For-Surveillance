import math
import pickle
import csv
import numpy as np
import json
import simplejson as sj
from collections import defaultdict
from datetime import date
import time	


d = pickle.load( open( "new_virat_results.p", "rb" ))
motion = pickle.load( open( "virat_motion.p", "rb" ))
#read binary

xref = {
'unlabeled': 0, 
'person': 1, 
'bicycle': 2, 
'car': 3, 
'motorcycle': 4, 
'airplane': 5, 
'bus': 6, 
'train': 7, 
'truck': 8, 
'boat': 9, 
'traffic': 10, 
'fire': 11, 
'street': 12, 
'stop': 13, 
'parking': 14, 
'bench': 15, 
'bird': 16, 
'cat': 17, 
'dog': 18, 
'horse': 19, 
'sheep': 20, 
'cow': 21, 
'elephant': 22, 
'bear': 23, 
'zebra': 24, 
'giraffe': 25, 
'hat': 26, 
'backpack': 27, 
'umbrella': 28, 
'shoe': 29, 
'eye': 30, 
'handbag': 31, 
'tie': 32, 
'suitcase': 33, 
'frisbee': 34, 
'skis': 35, 
'snowboard': 36, 
'sports': 37, 
'kite': 38, 
'baseball': 39, 
'baseball': 40, 
'skateboard': 41, 
'surfboard': 42, 
'tennis': 43, 
'bottle': 44, 
'plate': 45, 
'wine': 46, 
'cup': 47, 
'fork': 48, 
'knife': 49, 
'spoon': 50, 
'bowl': 51, 
'banana': 52, 
'apple': 53, 
'sandwich': 54, 
'orange': 55, 
'broccoli': 56, 
'carrot': 57, 
'hot': 58, 
'pizza': 59, 
'donut': 60, 
'cake': 61, 
'chair': 62, 
'couch': 63, 
'potted': 64, 
'bed': 65, 
'mirror': 66, 
'dining': 67, 
'window': 68, 
'desk': 69, 
'toilet': 70, 
'door': 71, 
'tv': 72, 
'laptop': 73, 
'mouse': 74, 
'remote': 75, 
'keyboard': 76, 
'cell': 77, 
'microwave': 78, 
'oven': 79, 
'toaster': 80, 
'sink': 81, 
'refrigerator': 82, 
'blender': 83, 
'book': 84, 
'clock': 85, 
'vase': 86, 
'scissors': 87, 
'teddy': 88, 
'hair': 89, 
'toothbrush': 90, 
'hair': 91, 
'banner': 92, 
'blanket': 93, 
'branch': 94, 
'bridge': 95, 
'building-other': 96, 
'bush': 97, 
'cabinet': 98, 
'cage': 99, 
'cardboard': 100, 
'carpet': 101, 
'ceiling-other': 102, 
'ceiling-tile': 103, 
'cloth': 104, 
'clothes': 105, 
'clouds': 106, 
'counter': 107, 
'cupboard': 108, 
'curtain': 109, 
'desk-stuff': 110, 
'dirt': 111, 
'door-stuff': 112, 
'fence': 113, 
'floor-marble': 114, 
'floor-other': 115, 
'floor-stone': 116, 
'floor-tile': 117, 
'floor-wood': 118, 
'flower': 119, 
'fog': 120, 
'food-other': 121, 
'fruit': 122, 
'furniture-other': 123, 
'grass': 124, 
'gravel': 125, 
'ground-other': 126, 
'hill': 127, 
'house': 128, 
'leaves': 129, 
'light': 130, 
'mat': 131, 
'metal': 132, 
'mirror-stuff': 133, 
'moss': 134, 
'mountain': 135, 
'mud': 136, 
'napkin': 137, 
'net': 138, 
'paper': 139, 
'pavement': 140, 
'pillow': 141, 
'plant-other': 142, 
'plastic': 143, 
'platform': 144, 
'playingfield': 145, 
'railing': 146, 
'railroad': 147, 
'river': 148, 
'road': 149, 
'rock': 150, 
'roof': 151, 
'rug': 152, 
'salad': 153, 
'sand': 154, 
'sea': 155, 
'shelf': 156, 
'sky-other': 157, 
'skyscraper': 158, 
'snow': 159, 
'solid-other': 160, 
'stairs': 161, 
'stone': 162, 
'straw': 163, 
'structural-other': 164, 
'table': 165, 
'tent': 166, 
'textile-other': 167, 
'towel': 168, 
'tree': 169, 
'vegetable': 170, 
'wall-brick': 171, 
'wall-concrete': 172, 
'wall-other': 173, 
'wall-panel': 174, 
'wall-stone': 175, 
'wall-tile': 176, 
'wall-wood': 177, 
'water-other': 178, 
'window-blind': 180, 
'window-other': 181, 
'wood': 182	
}

# d[d.keys()[0]][0]
# d[d.keys()[0]][1]
# d[d.keys()[0]][2]
# d[d.keys()[0]][3]

# d[d.keys()[0]][2].shape
# d[d.keys()[0]][1][0][0]

num_of_frames = 100

output = {}

def default(o):
	if isinstance(o, numpy.integer): return int(o)
	raise TypeError

def cleanup():
	for i,frame in enumerate(d.keys()):
		output[frame] = {}
		output[frame]["boxes"] = []
		output[frame]["classes"] = []
		output[frame]["class_count"] = defaultdict(int)
		output[frame]["motion"] = motion[i]
		
		

		for box in range(len(d[frame][1][0])):
			if d[frame][1][0][box] >= 0.80:
				# center point
				#print d[frame][2][0][box]
				output[frame]["boxes"].append(list(d[frame][0][0][box]))
				output[frame]["classes"].append(d[frame][2][0][box])
				output[frame]["class_count"][str(d[frame][2][0][box])] += 1
		output[frame]["class_count"] = dict(output[frame]["class_count"])

	print output[1500]

def update_location(frame_data, n):
	cnt = 0
	bag_type = frame_data['classes'][n]
	bag_count = 0
	backpack_count = 0
	xmin,ymin,xmax,ymax = frame_data['boxes'][n]
	threshold = 10
	for item in location_stats.keys():
		if 'bag' in item:
			bag_count+=1
		if 'backpack' in item:
			backpack_count+=1

	if not location_stats:
		if bag_type==27.0:
			location_stats['backpack'+str(backpack_count+1)] =  [(xmax+xmin)/2.0, (ymin+ymax)/2.0, 1]
		if bag_type==33.0:
			location_stats['bag'+str(bag_count+1)] =  [(xmax+xmin)/2.0, (ymin+ymax)/2.0, 1]
	else:
		centerx = (xmax+xmin)/2.0
		centery = (ymin+ymax)/2.0
		if bag_type==27.0:
			for item in location_stats.keys():
				if 'backpack' in item:
					dist = math.sqrt( (location_stats[item][0] - centerx)**2 + (location_stats[item][1] - centery)**2 )
					if dist < threshold:
						location_stats[item] = [centerx, centery, location_stats[item][2]+2]
		if bag_type==33.0:
			for item in location_stats.keys():
				if 'bag' in item:
					dist = math.sqrt( (location_stats[item][0] - centerx)**2 + (location_stats[item][1] - centery)**2 )
					if dist < threshold:
						location_stats[item] = [centerx, centery, location_stats[item][2]+2]

	#print location_stats


cleanup()

location_stats = {}

for frame in output.keys():
	number_of_boxes = len(output[frame]['classes'])
	for c in range(len(output[frame]['classes'])):
		if output[frame]['classes'][c]==27.0 or output[frame]['classes'][c]==33.0:
			update_location(output[frame],c)
	for item in location_stats.keys():
		location_stats[item][2] = location_stats[item][2]-1
		if location_stats[item][2] == 0:
			del location_stats[item]


	unattended_count = 0
	for item in location_stats.keys():
		if location_stats[item][2]>100:
			unattended_count+=1
	output[frame]['unattended_count'] = unattended_count


#print(location_stats)

new_output = {}
reverse_class_label = {}
for key,val in xref.items():
	reverse_class_label[val] = key

for item in output.keys():
	new_output[item] = {}
	new_output[item]["motion"] = int(output[item]["motion"])
	new_output[item]["unattended_count"] = int(output[item]['unattended_count'])
	new_output[item]["class_count"] = {}
	print output[item]['class_count'].items()
	for key,val in output[item]['class_count'].items():
		new_output[item]["class_count"][reverse_class_label[float(key)]] = val
print new_output[1]
with open('virat_data.json', 'w') as outfile:
    json.dump(new_output, outfile)


# 1 - Boxes
# 2 - Liklihood probability
# 3 - Center point of box
# 4 - List of elements in frame
# 5 - Suspicious item indicator