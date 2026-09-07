"""Cycles product-shoot lighting and a scroll-directed camera. Edit poses here, never in exported frames.
Run Blender --background --python scripts/spasynth/render_studio.py -- --proof
or --sequence --mobile. Frames are independently seekable WebPs; no video decoder needed.
"""
import bpy, math, sys, time, subprocess, shutil
from mathutils import Vector, Matrix
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'public/spasynth/assets'
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
mobile='--mobile' in args;proof='--proof' in args or '--posters' in args
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'scripts/spasynth/SPASynth.blend'))
scene=bpy.context.scene
for o in list(scene.objects):
 o.animation_data_clear()
 if o.type in ['LIGHT','CAMERA']:bpy.data.objects.remove(o,do_unlink=True)
scene.world=bpy.data.worlds.new('Dark studio environment');scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.1,.13,.12,1)
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.16
scene.render.engine='CYCLES';scene.cycles.samples=16 if '--quick' in args else (40 if proof else 16)
scene.cycles.use_denoising=True;scene.cycles.max_bounces=7;scene.cycles.diffuse_bounces=3;scene.cycles.glossy_bounces=4;scene.cycles.transmission_bounces=5
scene.render.use_persistent_data=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='METAL'
 scene.cycles.device='CPU' # Metal kernel compiler crashes on this host; use stable CPU Cycles.
except Exception as e:print('GPU fallback',e)
scene.render.resolution_x=900 if mobile else 1200;scene.render.resolution_y=640 if mobile else 1080;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='JPEG';scene.render.image_settings.quality=86
scene.render.film_transparent=False;scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=-.35

# Materials are lit surfaces. Only turquoise display pixels and inlays emit.
face=bpy.data.materials['Actual SPASynth interface'];ns=face.node_tree.nodes;lk=face.node_tree.links;p=ns.get('Principled BSDF');tex=next(n for n in ns if n.type=='TEX_IMAGE')
for l in list(lk):
 if l.to_socket==p.inputs['Emission Color']:lk.remove(l)
p.inputs['Emission Strength'].default_value=0;p.inputs['Metallic'].default_value=0;p.inputs['Specular IOR Level'].default_value=.24;p.inputs['Roughness'].default_value=.43
separate=ns.new('ShaderNodeSeparateColor');lk.new(tex.outputs['Color'],separate.inputs['Color'])
# Green substantially exceeds red only in the turquoise UI. No glowing faceplate.
sub=ns.new('ShaderNodeMath');sub.operation='SUBTRACT';lk.new(separate.outputs['Green'],sub.inputs[0]);lk.new(separate.outputs['Red'],sub.inputs[1])
mask=ns.new('ShaderNodeMath');mask.operation='GREATER_THAN';mask.inputs[1].default_value=.065;lk.new(sub.outputs[0],mask.inputs[0])
lk.new(tex.outputs['Color'],p.inputs['Emission Color']);lk.new(mask.outputs[0],p.inputs['Emission Strength'])

def grain(mat,scale,strength,distance,roughlo,roughhi):
 ns=mat.node_tree.nodes;lk=mat.node_tree.links;p=ns.get('Principled BSDF')
 noise=ns.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=scale;noise.inputs['Detail'].default_value=2
 coords=ns.new('ShaderNodeTexCoord');lk.new(coords.outputs['Object'],noise.inputs['Vector'])
 bump=ns.new('ShaderNodeBump');bump.inputs['Strength'].default_value=strength;bump.inputs['Distance'].default_value=distance;lk.new(noise.outputs['Fac'],bump.inputs['Height']);lk.new(bump.outputs['Normal'],p.inputs['Normal'])
 ramp=ns.new('ShaderNodeMapRange');ramp.inputs['To Min'].default_value=roughlo;ramp.inputs['To Max'].default_value=roughhi;lk.new(noise.outputs['Fac'],ramp.inputs['Value']);lk.new(ramp.outputs['Result'],p.inputs['Roughness'])

grain(face,190,.2,.004,.37,.53)
for name in ['Anodized graphite','Satin rubber','Machined edges']:
 m=bpy.data.materials[name];grain(m,210,.22,.004,.3 if name!='Satin rubber' else .46,.45 if name!='Satin rubber' else .62)
 p=m.node_tree.nodes.get('Principled BSDF')
 if name=='Satin rubber':p.inputs['Metallic'].default_value=0;p.inputs['Base Color'].default_value=(.012,.015,.014,1)
 if name=='Machined edges':p.inputs['Base Color'].default_value=(.09,.11,.1,1);p.inputs['Metallic'].default_value=.65
wood=bpy.data.materials['Walnut'];ns=wood.node_tree.nodes;lk=wood.node_tree.links;p=ns.get('Principled BSDF')
coord=ns.new('ShaderNodeTexCoord');mapping=ns.new('ShaderNodeVectorMath');mapping.operation='MULTIPLY';mapping.inputs[1].default_value=(6,.25,3);lk.new(coord.outputs['Object'],mapping.inputs[0])
noise=ns.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=9;noise.inputs['Detail'].default_value=3;noise.inputs['Roughness'].default_value=.75;lk.new(mapping.outputs['Vector'],noise.inputs['Vector'])
ramp=ns.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.22;ramp.color_ramp.elements[0].color=(.035,.009,.003,1);ramp.color_ramp.elements[1].position=.78;ramp.color_ramp.elements[1].color=(.26,.11,.042,1);lk.new(noise.outputs['Fac'],ramp.inputs[0]);lk.new(ramp.outputs['Color'],p.inputs['Base Color'])
bump=ns.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.2;bump.inputs['Distance'].default_value=.012;lk.new(noise.outputs['Fac'],bump.inputs['Height']);lk.new(bump.outputs['Normal'],p.inputs['Normal']);p.inputs['Roughness'].default_value=.38;p.inputs['Coat Weight'].default_value=.18;p.inputs['Coat Roughness'].default_value=.3

# A satin studio surface receives actual soft shadows beneath the enclosure and assemblies.
def material(name,c,rough=.5):
 m=bpy.data.materials.new(name);m.diffuse_color=(*c,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Roughness'].default_value=rough;return m
# Thin optical covers catch strip reflections independently of the powder-coated panels.
glass=material('Display glass',(.96,.99,.98),.065)
gp=glass.node_tree.nodes.get('Principled BSDF');gp.inputs['Transmission Weight'].default_value=1;gp.inputs['IOR'].default_value=1.46
# Anti-reflective optical coating: restrained glass reflection over clear transmission.
gn=glass.node_tree.nodes;gl=glass.node_tree.links;transparent=gn.new('ShaderNodeBsdfTransparent');mix=gn.new('ShaderNodeMixShader');mix.inputs[0].default_value=.12;gl.new(transparent.outputs[0],mix.inputs[1]);gl.new(gp.outputs[0],mix.inputs[2]);gl.new(mix.outputs[0],gn.get('Material Output').inputs['Surface'])
for name,rect,parent in [('sample glass',(14,150,349,237),'sample controls'),('chaos glass',(629,463,807,549),'chaos controls'),('osc B glass',(373,151,703,235),'Chassis'),('osc C glass',(725,151,1060,235),'Chassis'),('filter glass',(1080,165,1363,290),'Chassis')]:
 x0,y0,x1,y1=rect;x=((x0+x1)/2-690)/138;y=(450-(y0+y1)/2)/138
 bpy.ops.mesh.primitive_cube_add(size=1,location=(x,y,.282));obj=bpy.context.object;obj.name=name;obj.dimensions=((x1-x0)/138,(y1-y0)/138,.015);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);obj.data.materials.append(glass);obj.parent=bpy.data.objects[parent]
 mod=obj.modifiers.new('Polished glass edge','BEVEL');mod.width=.008;mod.segments=2

floor=material('Studio charcoal',(.006,.008,.007),.82)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.63));backdrop=bpy.context.object;backdrop.name='Shadow-receiving studio sweep';backdrop.data.materials.append(floor)

def area(name,loc,target,power,sx,sy,color):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='RECTANGLE';o.data.size=sx;o.data.size_y=sy;o.data.color=color;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
area('Warm key softbox',(-5,5,9),(0,0,0),1500,5,7,(1,.86,.7))
area('Cool strip reflection',(6,2,6),(0,0,.5),850,1.5,6,(.65,.83,1))
area('Gentle frontal fill',(-1,-7,6),(0,0,.5),260,5,4,(.83,.9,1))
area('Top edge strip',(0,7,3),(0,0,0),700,7,.7,(1,.92,.8))

bpy.ops.object.camera_add();cam=bpy.context.object;cam.name='Story camera';cam.data.type='PERSP';cam.data.lens=57;cam.data.sensor_width=36;scene.camera=cam
cam.data.dof.use_dof=True;cam.data.dof.aperture_fstop=9
bpy.ops.object.empty_add();focus=bpy.context.object;focus.name='Story focus';cam.data.dof.focus_object=focus
# Semantic progress shares page.js's note landmarks. Camera moves begin before lift,
# then settle while the material layers separate. Full assembly gets a breathing beat.
POSES=[
 (0,(0,0,.25),(4,-7,19)),
 (.045,(-3.6,1.1,.6),(3.8,-4.4,10.5)),
 (.12,(-3.9,1.6,1.8),(3.2,-4,10.9)),
 (.215,(-3.9,1.6,2.1),(3.2,-4,10.9)),
 (.29,(.45,-.6,1.3),(6.8,-5.9,10.6)),
 (.37,(.65,-.6,2.4),(7,-5.9,11.7)),
 (.46,(.65,-.6,2.4),(7,-5.9,11.7)),
 (.545,(2.5,-2.5,1.2),(9,-8.2,11.8)),
 (.62,(2.8,-2.65,2.0),(9.5,-8.4,12.6)),
 (.68,(2.8,-2.65,2.0),(9.5,-8.4,12.6)),
 (.75,(0,0,1.4),(6,-9,23)),
 (.83,(0,0,1.4),(6,-9,23)),
 (1,(0,0,.25),(4,-7,19))]

def ease(t):t=max(0,min(1,t));return t*t*(3-2*t)
def lerp(a,b,t):return Vector(a).lerp(Vector(b),t)
def pose(p):
 for i in range(len(POSES)-1):
  a,b=POSES[i:i+2]
  if a[0]<=p<=b[0]:
   t=ease((p-a[0])/(b[0]-a[0]));return lerp(a[1],b[1],t),lerp(a[2],b[2],t)
 return Vector(POSES[-1][1]),Vector(POSES[-1][2])
MODULES={k:(bpy.data.objects[k.capitalize()+' module'],bpy.data.objects[k+' controls'],bpy.data.objects[k+' panel']) for k in ['sample','chaos','matrix']}
END={'sample':(-.65,.5,1.6),'chaos':(.35,.1,1.8),'matrix':(.65,-.45,1.5)}
def set_frame(p):
 close=1-ease((p-.84)/.16)
 for k,(group,controls,panel) in MODULES.items():
  start={'sample':.065,'chaos':.305,'matrix':.55}[k]
  lift=ease((p-start)/.075)*close;layers=ease((p-start-.065)/.075)*close
  group.location=Vector(END[k])*lift
  panel.location=(.12*layers,.06*layers,.45*layers)
  controls.location=(-.13*layers,.13*layers,1.1*layers)
 target,loc=pose(p)
 if mobile:loc=target+(loc-target)*1.12
 cam.location=loc;focus.location=target
 direction=(target-loc).normalized();right=direction.cross(Vector((0,1,0))).normalized();up=right.cross(direction);cam.rotation_euler=Matrix((right,up,-direction)).transposed().to_euler()
 return target

# Store the actual continuous camera and assembly track in the editable Blender scene.
N=181;scene.frame_end=N;scene.render.fps=30
for i in range(N):
 set_frame(i/(N-1));frame=i+1
 for obj in [cam,focus]+[o for values in MODULES.values() for o in values]:
  obj.keyframe_insert(data_path='location',frame=frame)
  if obj==cam:obj.keyframe_insert(data_path='rotation_euler',frame=frame)
scene.frame_set(1);bpy.context.preferences.filepaths.save_version=0
if not mobile:bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'scripts/spasynth/SPASynth-Studio.blend'))
# Script arguments permit cheap representative proofs before any full sequence.
if proof:
 folder=ROOT/'scrollcraft/builds/spasynth/lab/studio-proofs';folder.mkdir(parents=True,exist_ok=True)
 frames=[] if '--posters' in args else ([0,32] if '--quick' in args else [0,32,72,115,140,180])
else:
 folder=OUT/('sequence-mobile' if mobile else 'sequence');folder.mkdir(parents=True,exist_ok=True);frames=range(N)
for i in frames:
 scene.frame_set(i+1)
 delivery=folder/f'frame-{i:03d}.webp'
 if not proof and delivery.exists():continue
 if not proof and ((136<=i<=149) or i==180):
  prior=folder/('frame-135.webp' if i<180 else 'frame-000.webp')
  if prior.exists():shutil.copy2(prior,delivery);print('FRAME_REUSED',i,flush=True);continue
 if proof:
  scene.render.filepath=str(folder/f'frame-{i:03d}.jpg')
 else:
  raw=ROOT/'scrollcraft/builds/spasynth/renders'/('mobile' if mobile else 'desktop');raw.mkdir(parents=True,exist_ok=True)
  scene.render.image_settings.file_format='PNG';scene.render.filepath=str(raw/f'frame-{i:03d}.png')
 start=time.time();bpy.ops.render.render(write_still=True)
 if not proof:
  subprocess.run([shutil.which('python3'),'-c',"from PIL import Image;import sys;Image.open(sys.argv[1]).save(sys.argv[2],format='WEBP',quality=82,method=4)",scene.render.filepath,str(delivery)],check=True)
 print('FRAME_DONE',i,round(time.time()-start,2),flush=True)
if proof and '--quick' not in args:
 # Hero and motion-off images share the same light rig. Shadow catcher preserves grounding.
 scene.render.resolution_x=1600;scene.render.resolution_y=1050;scene.render.image_settings.file_format='PNG';scene.render.film_transparent=True;scene.render.image_settings.color_mode='RGBA';backdrop.is_shadow_catcher=True
 for frame,name in [(1,'studio-assembled'),(141,'studio-exploded')]:
  raw=ROOT/'scrollcraft/builds/spasynth/lab/studio-posters';raw.mkdir(parents=True,exist_ok=True)
  scene.frame_set(frame);scene.render.filepath=str(raw/f'{name}.png');bpy.ops.render.render(write_still=True)
  subprocess.run([shutil.which('python3'),'-c',"from PIL import Image;import sys;Image.open(sys.argv[1]).save(sys.argv[2],format='WEBP',quality=90,method=6)",scene.render.filepath,str(OUT/f'{name}.webp')],check=True)
print('STUDIO_RENDER_COMPLETE',flush=True)
