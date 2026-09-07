import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

// Blender's separate module and layer nodes are retained in the GLB.
// This is a physical illustration of software, not a simulated circuit.
const stage = document.querySelector('#synth-stage');
const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
let renderer, model, camera, scene, env, current = 0, target = 0, visible = false;
let activeModule = 'sample', raf = 0;
const moduleNodes = new Map();
const clamp = v => Math.max(0, Math.min(1, v));
const ease = v => { const t = clamp(v); return t * t * (3 - 2 * t); };
const endPositions = { sample: [-1.1, 2.1, -.45], chaos: [.35, 3.0, -.15], matrix: [.8, 2.3, .65] };

function resize() {
  if (!renderer) return;
  const width = stage.clientWidth, height = stage.clientHeight;
  if (!width || !height) return;
  renderer.setSize(width, height);
  const aspect = width / height;
  const span = aspect < 1 ? 14.7 / aspect : 11.2;
  camera.left = -span * aspect / 2; camera.right = span * aspect / 2;
  camera.top = span / 2; camera.bottom = -span / 2;
  camera.updateProjectionMatrix(); wake();
}
function draw() {
  raf = 0;
  if (!model || document.hidden || !visible) return;
  current = Math.abs(target-current) < .0001 ? target : current+(target-current)*.17;
  const reduced = reduceQuery.matches;
  const p = reduced ? .79 : current;
  const close = 1-ease((p-.82)/.17);
  for (const [key, node] of moduleNodes) {
    const start = {sample:.015,chaos:.265,matrix:.51}[key];
    const lift = ease((p-start)/.12)*close;
    const layers = ease((p-start-.08)/.115)*close;
    node.position.fromArray(endPositions[key]).multiplyScalar(lift);
    for (const child of node.children) {
      if (child.userData.layer === 'controls') child.position.y = layers * .95;
      if (child.userData.layer === 'panel') child.position.y = layers * .42;
    }
  }
  // The camera opens its angle only as parts lift. No perpetual spin.
  const spread = ease(p/.72)*close;
  camera.position.set(6.5+spread*3, 7.5+spread*2.3, 20);
  model.scale.setScalar(1-spread*.15);
  camera.lookAt(0,0,.5+spread*.7);
  model.rotation.z = -.035 + spread*.04;
  renderer.render(scene,camera);
  stage.dataset.scVerifyState = `model:${p.toFixed(3)};module:${activeModule};spread:${spread.toFixed(3)}`;
  stage.dataset.modelProgress = p.toFixed(3);
  if (Math.abs(target-current)>.0001 && !reduced) wake();
}
function wake() { if (!raf && model && visible && !document.hidden) raf = requestAnimationFrame(draw); }

window.addEventListener('spasynth:progress', e => {
  target = clamp(e.detail.progress); activeModule=e.detail.activeModule;
  wake();
});
reduceQuery.addEventListener('change',wake);
document.addEventListener('visibilitychange',wake);

async function init() {
  try {
    renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .95;
    renderer.domElement.setAttribute('aria-hidden','true');
    renderer.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 200ms ease-out';
    stage.append(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-8,8,5,-5,.1,100);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment(); env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.5;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xe8f3f1,0x5c4331,.8));
    const key = new THREE.DirectionalLight(0xffd8ae,2);key.position.set(-4,7,9);scene.add(key);
    const rim = new THREE.DirectionalLight(0xb3e9f1,1.2);rim.position.set(6,2,4);scene.add(rim);
    const gltf=await new GLTFLoader().loadAsync('./assets/spasynth.glb');
    model = new THREE.Group();model.rotation.x=Math.PI/2;model.add(gltf.scene);scene.add(model);
    gltf.scene.traverse(node=>{if(node.userData.module)moduleNodes.set(node.userData.module,node);});
    resize();
    // Only reveal after a complete first render; keep the exact Blender poster on failure.
    visible=true;current=target;draw();
    renderer.domElement.style.opacity='1';stage.dataset.modelReady='true';window.dispatchEvent(new Event('spasynth:ready'));
    for (const img of stage.querySelectorAll('img')) img.style.opacity='0';
    new ResizeObserver(resize).observe(stage);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;wake();},{rootMargin:'100px'}).observe(stage);
    renderer.domElement.addEventListener('webglcontextlost',e=>{
      e.preventDefault();stage.dataset.modelReady='false';renderer.domElement.style.opacity='0';
      for(const img of stage.querySelectorAll('img'))img.style.opacity='1';
    });
    renderer.domElement.addEventListener('webglcontextrestored',()=>{
      renderer.domElement.style.opacity='1';stage.dataset.modelReady='true';
      for(const img of stage.querySelectorAll('img'))img.style.opacity='0';wake();
    });
  } catch(error) {
    stage.dataset.modelReady='false';
    for (const img of stage.querySelectorAll('img')) img.src='./assets/model-exploded.png';
    if(renderer) { renderer.domElement.remove();renderer.dispose(); }
    console.warn('SPASynth: displaying Blender poster because interactive 3D is unavailable.',error.message);
  }
}
if(stage) {
  let started=false;
  const loader=new IntersectionObserver(entries=>{
    if (!entries[0].isIntersecting || started) return;
    if (reduceQuery.matches) {
      stage.dataset.modelReady='poster';
      for (const img of stage.querySelectorAll('img')) img.src='./assets/model-exploded.png';
      return;
    }
    started=true;loader.disconnect();init();
  },{rootMargin:'700px'});
  loader.observe(stage);
  reduceQuery.addEventListener('change',()=>{
    if(!reduceQuery.matches && !started){started=true;loader.disconnect();init();}
  });
}
