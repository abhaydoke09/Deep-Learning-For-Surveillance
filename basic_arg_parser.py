# -*- coding: utf-8 -*-
"""
Created on Sat Sep 16 02:17:00 2017

@author: david
"""

import math
import pickle
import csv
import numpy as np
import json
import simplejson as sj

d = pickle.load( open( "result.p", "rb" ))
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

def cleanup():
	for i in range(num_of_frames):
		for j in range(100):

			if d[d.keys()[i]][1][0][j] >= 0.80:
				# center point
				d[d.keys()[i]][3]=[(d[d.keys()[i]][0][0][j][0]+d[d.keys()[i]][0][0][j][2])*0.5,(d[d.keys()[i]][0][0][j][1]+d[d.keys()[i]][0][0][j][3])*0.5]
				# mapping key to value for class
					d[d.keys()[i]][2][0][j] = xref.keys()[xref.values().index(int(d[d.keys()[i]][2][0][j]))]
					
					h = 0
					num_of_elem = len(d[d.keys()[i]][2][j])
					count_elems = [[0]]
					while h<num_of_elem:
						count_elems.append([0])
						h += 1
					count_elems[j] = d[d.keys()[i]][4][j]

					if d[d.keys()[i]][2][0][j]=='suitcase' or d[d.keys()[i]][2][0][j]=='hand bag'
						for z in range(num_of_frames):
							if math.sqrt((d[d.keys()[i]][3])**2+(d[d.keys()[i+1]][3])**2)<=50:
								d[d.keys()[i]][5] = 'SUSPICIOUS BAG'
							else:
								d[d.keys()[i]][5] = 'OK'
					else:
						pass

			else: 
				k = 0
				while k<=3:
					del d[d.keys()[i]][k][0][j]
					del d[d.keys()[i]][k][0][j]
					del d[d.keys()[i]][k][0][j]
					del d[d.keys()[i]][k][0][j]
					k += 1


cleanup()
jsonify()

# 1 - Boxes
# 2 - Liklihood probability
# 3 - Center point of box
# 4 - List of elements in frame
# 5 - Suspicious item indicator
