import cv2
import glob

height = 0
width = 0
height , width , layers =  cv2.imread('/Users/abhaydoke/tensorflow-object-detection-model/models/object_detection/results/result1502.jpg').shape
fourcc = cv2.VideoWriter_fourcc(*'XVID') # Be sure to use lower case
out = cv2.VideoWriter('luggage.avi', fourcc, 10.0, (width, height))

for i in xrange(1,2091):
	image = cv2.imread('/Users/abhaydoke/tensorflow-object-detection-model/models/object_detection/results/result'+str(i)+'.jpg')		
	out.write(image)

out.release()

