import cv2

def diffImg(t0, t1, t2):
  d1 = cv2.absdiff(t2, t1)
  d2 = cv2.absdiff(t1, t0)

  return cv2.bitwise_and(d1, d2)

cam = cv2.VideoCapture('../video_data/VIRAT_S_000200_03_000657_000899.mp4')


t_minus = cv2.cvtColor(cam.read()[1], cv2.COLOR_RGB2GRAY)
t_minus = cv2.GaussianBlur(t_minus, (5, 5), 0)
t = cv2.cvtColor(cam.read()[1], cv2.COLOR_RGB2GRAY)
t = cv2.GaussianBlur(t, (5, 5), 0)
t_plus = cv2.cvtColor(cam.read()[1], cv2.COLOR_RGB2GRAY)
t_plus = cv2.GaussianBlur(t_plus, (5, 5), 0)
cnt=0
while True:
  diff = diffImg(t_minus, t, t_plus) 
  thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)[1]
  thresh = cv2.dilate(thresh, None, iterations=7)
  cv2.imwrite( 'img'+str(cnt)+'.jpg', thresh ) 
  cnt+=1

  # Read next image
  t_minus = t
  t = t_plus
  t_plus = cv2.cvtColor(cam.read()[1], cv2.COLOR_RGB2GRAY)
  t_plus = cv2.GaussianBlur(t_plus, (5, 5), 0)
  

print "Goodbye"
