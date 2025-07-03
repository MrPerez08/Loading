import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//ALL OF THE LIGHTSSS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensity
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, -20, 20);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//BORDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


let pi=3.14159

let x=1
let y=1
let z=1

//WE GOT DA BAWX
const geometry = new THREE.BoxGeometry(x,y,z); 
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00}); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );


camera.position.z = 100;




//The following variables are INDICATIVE OF WHEN THE PHASES END (FOR EXAMPLE: p1=1, MEANS (PHASE 1) ENDS AT counter=1)
let counter=0
let p1=1
let p2=3
let p3=5
let p4=7
let p5=9


let animationStartTime = null;
const animationDuration = 10; // seconds
const targetScaleX = 10; // your target scale


function animate() {
    requestAnimationFrame(animate);

    counter+=.001
    console.log(counter)







    // If animation hasn't started yet, initialize it
    if (animationStartTime === null) {
        animationStartTime = Date.now();
    }
    
    // Calculate elapsed time in seconds
    const elapsedTime = (Date.now() - animationStartTime) / 1000;
    
    // If animation is still running
    if (elapsedTime < animationDuration) {
        // Calculate progress (0 to 1)
        const progress = elapsedTime / animationDuration;
        
        // Interpolate the scale (linear interpolation in this case)
        cube.scale.x = 1 + (targetScaleX - 1) * progress;
    } else {
        // Animation complete - ensure final value is set
        cube.scale.x = targetScaleX;
    }









    

    if(counter<p1&&counter>0){
        //oblivion to dot

    }
    if(counter<p2&&counter>p1+1){
        //dot to rod
    }
    if(counter<p3&&counter>p2+1){
        //rod to plane
    }
    if(counter<p4&&counter>p3+1){
        //plane to box
    }
    if(counter<p5&&counter>p4+1){
        //box to oblivion
    }
    if(counter>p5+1){counter=0}
  


    renderer.render(scene, camera);
}

animate();