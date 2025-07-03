import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial parameters
let radius = .01;
const segments = 40;

// Create initial geometry
let geo = new THREE.CircleGeometry(radius, segments);
const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const circle = new THREE.Mesh(geo, mat);
scene.add(circle);

camera.position.z = 5;

function animate() {
    // Increase radius
    
    //radius += 0.005;
    
    // Create a new geometry with the updated radius
    const newGeo = new THREE.CircleGeometry(radius, segments);
    
    // Replace the old geometry with the new one
    circle.geometry.dispose(); // Important: clean up the old geometry
    circle.geometry = newGeo;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();