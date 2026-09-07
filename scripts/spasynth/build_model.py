"""Reproducible physical interpretation of SPASynth. Run with Blender --background --python.
The internal layers are illustrative; SPASynth is software, not actual hardware.
"""
import bpy, math, os, sys
from mathutils import Vector, Matrix
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/spasynth/assets'; OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
for d in list(bpy.data.materials): bpy.data.materials.remove(d)

def mat(name,color,metal=0,rough=.4,emission=0):
 m=bpy.data.materials.new(name); m.diffuse_color=(*color,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if emission: p.inputs['Emission Color'].default_value=(*color,1);p.inputs['Emission Strength'].default_value=emission
 return m
black=mat('Anodized graphite',(.035,.045,.045),.65,.36)
edge=mat('Machined edges',(.14,.17,.17),.8,.27)
knobmat=mat('Satin rubber',(.017,.022,.023),.15,.45)
metal=mat('Fasteners',(.25,.29,.29),.9,.25)
wood=mat('Walnut',(.19,.073,.028),0,.48)
woodgrain=mat('Walnut grain',(.11,.039,.016),0,.6)
teal=mat('Turquoise inlay',(.045,.69,.61),.3,.3,.35)
copper=mat('Copper traces',(.5,.24,.09),.75,.4)
boardmat=mat('Illustrative graphite circuit substrate',(.035,.065,.058),.15,.65)
labelmat=mat('Silkscreen',(.7,.77,.74),0,.5)
# Real interface image provides exact face typography, screen content and alignment.
img=bpy.data.images.load('/Users/mikejerugim/spasynth/docs/spasynth-marketing.png');img.pack()
face=bpy.data.materials.new('Actual SPASynth interface');face.use_nodes=True
p=face.node_tree.nodes.get('Principled BSDF');p.inputs['Roughness'].default_value=.55;p.inputs['Metallic'].default_value=.18
tex=face.node_tree.nodes.new('ShaderNodeTexImage');tex.image=img
face.node_tree.links.new(tex.outputs['Color'],p.inputs['Base Color']);face.node_tree.links.new(tex.outputs['Color'],p.inputs['Emission Color']);p.inputs['Emission Strength'].default_value=.22

root=bpy.data.objects.new('SPASynth',None);bpy.context.collection.objects.link(root)
def group(name,parent=root,**props):
 o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o);o.parent=parent
 for k,v in props.items():o[k]=v
 return o

def cube(name,loc,size,material,parent=root,bevel=.03):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Machined radius','BEVEL');mod.width=bevel;mod.segments=3
  bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
  for f in o.data.polygons:f.use_smooth=True
  mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=mod.name)
 o.data.materials.append(material);o.parent=parent;return o

def cyl(name,x,y,z,r,depth,material,parent,vertices=40):
 bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=r,depth=depth,location=(x,y,z));o=bpy.context.object;o.name=name;o.data.materials.append(material);o.parent=parent
 mod=o.modifiers.new('Soft edge','BEVEL');mod.width=.008;mod.segments=2;bpy.ops.object.modifier_apply(modifier=mod.name)
 for f in o.data.polygons:f.use_smooth=True
 return o

def wire(name,pts,r,material,parent):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=r;c.bevel_resolution=1
 sp=c.splines.new('POLY');sp.points.add(len(pts)-1)
 for p,co in zip(sp.points,pts):p.co=(*co,1)
 o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.data.materials.append(material);o.parent=parent
 bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False)
 return o

# Coordinates map the supplied UI's 1380 x 900 layout into a 10 x 6.52 panel.
def xy(px,py):return ((px-690)/138, (450-py)/138)
def panel(name,rect,parent,z=.24):
 x0,y0,x1,y1=rect;x,y=xy((x0+x1)/2,(y0+y1)/2);w=(x1-x0)/138;h=(y1-y0)/138
 cube(name+' plate',(x,y,z-.055),(w,h,.11),black,parent,.022)
 # UV sampled from full screenshot, kept upright in XY.
 verts=[(x-w/2,y-h/2,z+.003),(x+w/2,y-h/2,z+.003),(x+w/2,y+h/2,z+.003),(x-w/2,y+h/2,z+.003)]
 mesh=bpy.data.meshes.new(name+' face');mesh.from_pydata(verts,[],[(0,1,2,3)]);mesh.update();o=bpy.data.objects.new(name+' interface',mesh);bpy.context.collection.objects.link(o);o.parent=parent;o.data.materials.append(face)
 uv=mesh.uv_layers.new();coords=[(x0/1380,1-y1/900),(x1/1380,1-y1/900),(x1/1380,1-y0/900),(x0/1380,1-y0/900)]
 for lp,co in zip(uv.data,coords):lp.uv=co
 return (x,y,w,h)

body=group('Chassis')
cube('Extruded enclosure',(0,0,-.18),(10.27,6.78,.72),black,body,.13)
cube('Front lip',(0,0,.06),(10.17,6.68,.17),edge,body,.08)
for side in [-1,1]:
 cube('Walnut cheek',(side*5.21,0,-.13),(.22,6.76,.86),wood,body,.05)
 for k in range(10):
  x=side*5.21+(k-5)*.017
  wire('Longitudinal wood grain',[(x+math.sin(j*1.7+k)*.005,-3.29+j*.33,.307) for j in range(21)],.003,woodgrain,body)
 for y in [-2.8,2.8]:cyl('Chassis screw',side*4.98,y,.17,.042,.04,metal,body,16)
# Rear ventilation reveals true enclosure depth during motion.
for k in range(28):cube('Rear cooling slot',(-3.5+k*.255,2.88,-.552),(.14,.45,.012),knobmat,body,.018)

sample=group('Sample module',module='sample');chaos=group('Chaos module',module='chaos');matrix=group('Matrix module',module='matrix')
modules={}
for key,g,rect in [('sample',sample,(5,115,360,424)),('chaos',chaos,(616,427,1009,646)),('matrix',matrix,(616,649,1375,874))]:
 base=group(key+' substrate',g,layer='board');controls=group(key+' controls',g,layer='controls');plate=group(key+' panel',g,layer='panel')
 x,y,w,h=panel(key,rect,plate)
 cube(key+' circuit board',(x,y,.055),(w-.08,h-.08,.035),boardmat,base,.012)
 for k in range(4):
  cx=x-w*.3+k*w*.2;cy=y
  cube(key+' processor',(cx,cy,.09),(.23,.27,.055),knobmat,base,.012)
  for j in [-1,1]:
   for n in range(5):cube('Processor pin',(cx+j*.145,cy+(n-2)*.047,.08),(.055,.014,.013),metal,base,0)
  wire('Signal trace',[(cx,y,.077),(cx,y+h*.3,.077),(x+w*.4,y+h*.3,.077)],.009,copper,base)
 for sx in [-1,1]:
  for sy in [-1,1]:cyl('Standoff',x+sx*(w/2-.1),y+sy*(h/2-.1),.11,.035,.19,metal,base,16)
 modules[key]=(g,base,controls,plate)
# Remaining visible modules remain part of the chassis.
for name,rect in [('Header',(5,0,1375,112)),('Oscillator B',(363,115,712,424)),('Oscillator C',(715,115,1068,424)),('Filter',(1071,115,1375,424)),('Envelope',(5,427,309,646)),('LFO',(312,427,613,646)),('Arpeggiator',(1012,427,1375,646)),('Effects',(5,649,613,874)),('Footer',(5,877,1375,898))]:panel(name,rect,body)

def knob(px,py,parent,r=.137):
 x,y=xy(px,py);cyl('Knob seat',x,y,.265,r*1.17,.035,edge,parent)
 cyl('Knurled encoder',x,y,.365,r,.17,knobmat,parent)
 cyl('Brushed encoder cap',x,y,.454,r*.94,.024,black,parent)
 for j in range(22):
  a=j*math.tau/22
  cube('Encoder grip',(x+math.cos(a)*r,y+math.sin(a)*r,.36),(.012,.012,.115),edge,parent,.003)
 cube('Turquoise position inlay',(x-.04,y+.078,.469),(.021,.069,.008),teal,parent,.004)

for px,py in [(48,312),(113,312),(182,312),(250,312),(317,312),(48,374),(115,374),(183,374)]:knob(px,py,modules['sample'][2])
for start in [363,715]:
 for dx in [39,103,169,235,301]:
  for py in [312,374]:knob(start+dx,py,body)
for px,py in [(1105,350),(1220,350),(1320,350),(1105,393),(1220,393),(1320,393)]:knob(px,py,body,.10)
for px in [48,116,186,257]:knob(px,599,body)
for px in [338,405]:knob(px,599,body)
for px,py in [(863,501),(922,501),(980,501),(650,600),(717,600),(780,600),(845,600),(910,600),(975,600)]:knob(px,py,modules['chaos'][2],.12)
for row in range(8):
 x,y=xy(1244,694+23.5*row);cyl('Matrix amount slider',x,y,.286,.029,.045,metal,modules['matrix'][2],16)
for px in [315,383,449]:knob(px,824,body,.12)
for px in [1066,1154,1250]:
 for py in [546,604]:knob(px,py,body,.12)
# Place a separate glass plate over the selected module displays, with a thin physical bezel.
for key,rect in [('sample',(14,150,349,237)),('chaos',(629,463,807,549))]:
 x0,y0,x1,y1=rect;x,y=xy((x0+x1)/2,(y0+y1)/2);w=(x1-x0)/138;h=(y1-y0)/138
 # face remains visible; edge-only glass housing adds depth without hiding labels
 for sx in [-1,1]:cube('Display bezel',(x+sx*w/2,y,.28),(.017,h,.045),edge,modules[key][2],.005)
 for sy in [-1,1]:cube('Display bezel',(x,y+sy*h/2,.28),(w,.017,.045),edge,modules[key][2],.005)

# Consolidate meshes by material within each independently moving group.
for par in [body]+[p for v in modules.values() for p in v[1:]]:
 meshes=[o for o in par.children if o.type=='MESH']
 buckets={}
 for o in meshes:buckets.setdefault(o.data.materials[0].name if o.data.materials else '',[]).append(o)
 for key,obs in buckets.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in obs:o.select_set(True)
  bpy.context.view_layer.objects.active=obs[0];bpy.ops.object.join();bpy.context.object.name=par.name+' '+key

# Export asset before adding studio lights and camera.
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.context.scene.objects:o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'spasynth.glb'),export_format='GLB',use_selection=True,export_extras=True,export_apply=True)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24
scene.render.resolution_x=1600;scene.render.resolution_y=1050;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=True
scene.world.color=(.18,.18,.18)
def area(name,loc,power,size,color):
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size;o.data.color=color;o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat('-Z','Y').to_euler()
area('Warm softbox',(-5,6,9),1600,8,(1,.78,.56));area('Cool edge',(7,2,5),1200,7,(.6,.85,1));area('Top reflection',(-1,-4,7),900,5,(1,1,1))
bpy.ops.object.camera_add(location=(7,-8,19));cam=bpy.context.object;cam.location=(3,-7,20)
direction=(Vector((0,0,.5))-cam.location).normalized();right=direction.cross(Vector((0,1,0))).normalized();up=right.cross(direction)
cam.rotation_euler=Matrix((right,up,-direction)).transposed().to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=12.5;scene.camera=cam
scene.view_settings.exposure=-.9
# Animated proof stored in editable file. Final web animation is driven by scroll.
for key,(g,base,controls,plate) in modules.items():
 g.location=(0,0,0);g.keyframe_insert(data_path='location',frame=1)
 dx,dy,dz={'sample':(-.85,.45,1.55),'chaos':(.4,.15,2.25),'matrix':(.8,-.5,1.65)}[key]
 g.location=(dx,dy,dz);g.keyframe_insert(data_path='location',frame=90)
 controls.location=(0,0,.6);controls.keyframe_insert(data_path='location',frame=90)
 plate.location=(0,0,.23);plate.keyframe_insert(data_path='location',frame=90)
 for o in [g,controls,plate]:
  o.location=(0,0,0);o.keyframe_insert(data_path='location',frame=1);o.keyframe_insert(data_path='location',frame=180)
scene.frame_end=180;scene.frame_set(1)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'scripts/spasynth/SPASynth.blend'))
scene.render.filepath=str(OUT/'model-assembled.png');bpy.ops.render.render(write_still=True)
scene.frame_set(90);cam.data.ortho_scale=14.4;scene.render.filepath=str(OUT/'model-exploded.png');bpy.ops.render.render(write_still=True)
print('SPASYNTH_MODEL_COMPLETE')
