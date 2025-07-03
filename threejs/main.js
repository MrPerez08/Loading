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


let geo2 = new THREE.CylinderGeometry( 5, 5, 5, 32 ); 
geo2.center();
const mat2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cylinder = new THREE.Mesh( geo2, mat2 );
cylinder.position.set(0,0,0)
scene.add(cylinder);
cylinder.rotation.z = π/2



const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
//scene.add( cube );




camera.position.z = 100;


function animate() {
    // Increase radius
    
    //radius += 0.005;
    
    // Create a new geometry with the updated radius
    //const newGeo = new THREE.CircleGeometry(radius, segments);
    
    // Replace the old geometry with the new one
    //circle.geometry.dispose(); // Important: clean up the old geometry
    //circle.geometry = newGeo;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    cube.rotation.x +=.01
    cube.rotation.y +=.01
    cube.rotation.z +=.01
}

animate();