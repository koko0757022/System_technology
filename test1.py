import time
import RPi.GPIO as GPIO

pin=[3,5,7,11,13,15,19,21,23,8]

# to use Raspberry Pi board pin numbers
GPIO.setmode(GPIO.BOARD)
GPIO.setup(10,GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
def setup(p):
  GPIO.setup(pin[p], GPIO.OUT)

def out(p, v):
  GPIO.output(pin[i], v)

for i in range(0, len(pin)): setup(i)

for i in range(0, len(pin)): out(i, 0);

try:
	while True:
		for i in range(0, len(pin)):
			out(i, 1);
			time.sleep(0.1)
			if(GPIO.input(10) == 1):
				break;
		for i in range(len(pin)-1, -1, -1):
			out(i, 0);
			time.sleep(0.1)
			if(GPIO.input(10) == 1):
				break;

except KeyboardInterrupt:
	GPIO.cleanup()
