import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


let pi=3.14159

let x=10
let y=10
let z=1


//WE GOT DA BAWX
const geometry = new THREE.BoxGeometry(x,y,z); 
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00}); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );


//ALL OF THE LIGHTSSS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, -20, 20);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);






camera.position.z = 100;




let counter=0
let phase1=1

let oldcubescaleZ=0  //stores the old z-scale of object from the previous frame (its used to hold illusion of keeping the object same size)


cube.rotation.x=pi/2

function animate() {
  requestAnimationFrame(animate);
  oldcubescaleZ=cube.scale.z
  counter+=.001
  console.log(counter)




  //cube.rotation.x +=.01
  //cube.rotation.y +=.01


  //One Dimensional -> Two Dimensional
  if(counter<phase1){
    //cube.scale.z=cube.scale.x*x/z //extrudes z-coordinate of obj to turn 'dot' into a 'line'

  }


  //Two Dimensional -> Three Dimensional
  /*
  if (counter<2&&counter>1){
    cube.rotation.z +=.01
    cube.scale.z=cube.scale.x*x/z //extrudes z-coordinate of cube to turn the square into a cube
    camera.position.z+=z*(cube.scale.z-oldcubescaleZ)/2  //maintains percieved scale of the object to the camera
    directionalLight.position.z+=z*(cube.scale.z-oldcubescaleZ)/2 //maintains percieved scale of the object to the light
    directionalLightHelper.position.z+=z*(cube.scale.z-oldcubescaleZ)/2 //maintains percieved scale of the object to the light helper
  } 
  */




  //Three Dimensional
  
  
  renderer.render(scene, camera);
}

animate();