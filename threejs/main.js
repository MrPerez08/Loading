import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial parameters
let radius = .02;
const segments = 40;

let π=3.14159


let x=10
let y=10
let z=.2

const geometry = new THREE.BoxGeometry(x,y,z); 
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00}); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, -20, 20);
scene.add(directionalLight);

// Optional: Add helper to visualize light
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);




cube.rotation.x=π/2

camera.position.z = 100;

let oldcubescaleZ=0  //stores the old z-scale of object from the previous frame (its used to hold illusion of keeping the object same size)

function animate() {
  requestAnimationFrame(animate);
  //oldcubescaleZ=cube.scale.z
    
  //cube.rotation.x +=.01
  //cube.rotation.y +=.01


  //One Dimensional

  //Two Dimensional

  //Three Dimensional
  cube.rotation.z +=.01
  cube.scale.z=cube.scale.x*x/z //extrudes z-coordinate of cube to turn the square into a cube
  //camera.position.z+=z*(cube.scale.z-oldcubescaleZ)/2  /maintains percieved scale of the object to the camera

  renderer.render(scene, camera);
}

animate();