
# coding: utf-8

# # Object Detection Demo
# Welcome to the object detection inference walkthrough!  This notebook will walk you step by step through the process of using a pre-trained model to detect objects in an image. Make sure to follow the [installation instructions](https://github.com/tensorflow/models/blob/master/object_detection/g3doc/installation.md) before you start.

# # Imports

# In[1]:

import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image
import glob
import pickle
import cv2


# ## Env setup

# In[2]:


# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("..")


# ## Object detection imports
# Here are the imports from the object detection module.

# In[3]:

from utils import label_map_util

from utils import visualization_utils as vis_util

PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

NUM_CLASSES = 100


label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)

PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

data = pickle.load(open( "result.p", "rb"))
test_images = glob.glob('/Users/abhaydoke/tensorflow-object-detection-model/models/object_detection/test_images/*.jpeg')

for i,image_path in enumerate(test_images):
	image = cv2.imread(image_path)
	(boxes, scores, classes, num) = data[i+1]
	vis_util.visualize_boxes_and_labels_on_image_array(
		image,
        np.squeeze(boxes),
        np.squeeze(classes).astype(np.int32),
        np.squeeze(scores),
        category_index,
        use_normalized_coordinates=True,
        line_thickness=8)
	cv2.imwrite('./results/result'+str(i+1)+'.jpg',image)







