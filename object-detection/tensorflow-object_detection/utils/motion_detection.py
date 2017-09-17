import cv2
import glob
import pickle

def diffImg(t0, t1, t2):
  d1 = cv2.absdiff(t2, t1)
  d2 = cv2.absdiff(t1, t0)

  return cv2.bitwise_and(d1, d2)

#cam = cv2.VideoCapture('../video_data/VIRAT_S_000200_03_000657_000899.mp4')

test_images = glob.glob('/Users/abhaydoke/tensorflow-object-detection-model/models/object_detection/temp/VIRAT_S_000001_mp4/*.jpeg')
motion = [0]
prev = cv2.imread(test_images[0])
prev = cv2.cvtColor(prev, cv2.COLOR_RGB2GRAY)
h,w = prev.shape
for i in range(1,len(test_images)):
  curr = cv2.imread(test_images[i])
  curr = cv2.cvtColor(curr, cv2.COLOR_RGB2GRAY)
  
  diff = cv2.absdiff(prev, curr)
  thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)[1]
  thresh = cv2.dilate(thresh, None, iterations=7)
  
  m = cv2.countNonZero(thresh)*100/(h*w)
  #print m

  motion.append(m)

  prev = curr

pickle.dump(motion, open( "virat_motion.p", "wb" ) )

