"""Temporary synthetic UI audio, NOT output from SPASynth. Replace before publishing."""
from pathlib import Path
import math, random, struct, wave
out=Path(__file__).resolve().parents[2]/'public/spasynth/assets'
random.seed(7);sr=24000;duration=4
for name in ['source','instrument','chaos']:
 samples=[]
 for i in range(sr*duration):
  t=i/sr;beat=t%0.5;env=math.exp(-beat*12)*min(1,beat*200)
  if name=='source':v=random.uniform(-1,1)*env*.23
  else:
   note=[220,261.63,329.63,293.66,220,329.63,392,261.63][int(t*2)%8]
   fm=math.sin(t*3)*4 if name=='chaos' else 0
   v=(math.sin(2*math.pi*note*t+fm)+.2*math.sin(2*math.pi*note*2*t))*env*.2
  v*=min(1,(duration-t)*20)
  samples.append(struct.pack('<h',int(max(-1,min(1,v))*32767)))
 with wave.open(str(out/f'placeholder-{name}.wav'),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(b''.join(samples))
