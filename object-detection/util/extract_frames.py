import numpy as np
import cv2
cnt=0
cap = cv2.VideoCapture('/Users/abhaydoke/Documents/HTN/object-detection/video_data/AVSS_AB_Easy_Divx.avi')
while(cap.isOpened()):
    ret, frame = cap.read()
    if cnt%30==0:
    	cv2.imwrite('../frame'+str(cnt)+'.jpg',frame)
    cnt+=1
    if cnt==100:
    	break
cap.release()
   # save frame as JPEG file
  
  