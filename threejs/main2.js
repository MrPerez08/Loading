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


let pi=Math.PI

let scale = 3

let x=1* scale
let y=1* scale
let z=1* scale

//WE GOT DA BAWX
const geometry = new THREE.BoxGeometry(x,y,z); 
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00}); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );

let initCamZ=100
let initLightZ=20
camera.position.z = initCamZ;




//The following variables are INDICATIVE OF WHEN THE PHASES END (FOR EXAMPLE: p1=1, MEANS (PHASE 1) ENDS AT loopTime=1)

let p1=2
let p2=4
let p3=6
let p4=8
let p5=10


let animationStartLoop =null;
let animationStartTime = null;
const animationDuration = 1; // seconds

const targetScale = 10; // your target scale

//THIS IS THE OLD ANCIENT STINKY DUSTY allottime() function with no object reference abilities
// function allotTime(animationDuration,targetScaleX){
//     // If animation hasn't started yet, initialize it
//     if (animationStartTime === null) {
//         animationStartTime = Date.now();
//     }
    
//     // Calculate elapsed time in seconds
//     const elapsedTime = (Date.now() - animationStartTime) / 1000;
    
//     // If animation is still running
//     if (elapsedTime < animationDuration) {
//         // Calculate progress (0 to 1)
//         const progress = elapsedTime / animationDuration;
        
//         // Interpolate the scale (linear interpolation in this case)
//         cube.scale.x = (targetScaleX) * progress;
//     } else {
//         // Animation complete - ensure final value is set
//         cube.scale.x = targetScaleX;
//     }
// }

//THIS IS THE NEW REFRESHING SEXY AND DELICIOUS allottime() function WITH OBJECT REFERENCE ABILITIES!!!!!
// function allotTime(object, property, targetValue, duration) {
//     // If animation hasn't started yet, initialize it
//     if (animationStartTime === null) {
//         animationStartTime = Date.now();
//         object.initialValue = object[property]; // Store initial value
//     }
    
//     // Calculate elapsed time in seconds
//     const elapsedTime = (Date.now() - animationStartTime) / 1000;
    
//     // If animation is still running
//     if (elapsedTime < duration) {
//         // Calculate progress (0 to 1)
//         const progress = elapsedTime / duration;
        
//         // Interpolate the value (linear interpolation)
//         object[property] = object.initialValue + (targetValue - object.initialValue) * progress;
//     } else {
//         // Animation complete - ensure final value is set
//         object[property] = targetValue;
//         animationStartTime = null; // Reset for next animation
//     }
    
// }

let progress=1;
let oldRotX=0;
let oldRotY=0;
let oldRotZ=0;
let individLoop=null;

function animate() {
    requestAnimationFrame(animate);
    if (animationStartLoop === null) {animationStartLoop = Date.now();}
    let loopTime = (Date.now() - animationStartLoop) / 1000;

    if (individLoop === null) {
        individLoop = Date.now();
        oldRotX=cube.rotation.x;
        oldRotY=cube.rotation.y;
        oldRotZ=cube.rotation.z;
    }
    let rotationTime = (Date.now() - individLoop) / 1000;


    progress= rotationTime/1

    // if(loopTime<1){allotTime(cube.scale,"x",10,animationDuration)}
    // if(loopTime>1){allotTime(cube.scale,"y",10,animationDuration)}
    

    console.log(progress)

    if(loopTime<1&&loopTime>0){
        cube.scale.x=.1
        cube.scale.y=.1
        cube.scale.z=.1

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
    }
    if(loopTime<2&&loopTime>1){
        cube.rotation.x=oldRotX+(pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi-oldRotY)*progress
        cube.rotation.z=oldRotZ+(pi-oldRotZ)*progress
    }
    if(loopTime>2&&loopTime<3){
        cube.scale.z=10
        camera.position.z=initCamZ+cube.scale.z/2
        directionalLight.position.z=initLightZ+cube.scale.z/2
        directionalLightHelper.position.z=initLightZ+cube.scale.z/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
    }
    if(loopTime>3&&loopTime<4){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(2*pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi/2-oldRotY)*progress
        cube.rotation.z=oldRotZ+(2*pi-oldRotZ)*progress
    }
    if(loopTime>4&&loopTime<5){
        cube.scale.x=10
        camera.position.z=initCamZ+cube.scale.x/2
        directionalLight.position.z=initLightZ+cube.scale.x/2
        directionalLightHelper.position.z=initLightZ+cube.scale.x/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
    }
    if(loopTime>5&&loopTime<6){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi/2-oldRotX)*progress
        cube.rotation.y=oldRotY+(3*pi-oldRotY)*progress
        cube.rotation.z=oldRotZ+(3*pi-oldRotZ)*progress
    }
    if(loopTime>6&&loopTime<7){
        cube.scale.y=10
        camera.position.z=initCamZ+cube.scale.y/2
        directionalLight.position.z=initLightZ+cube.scale.y/2
        directionalLightHelper.position.z=initLightZ+cube.scale.y/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
    }
    if(loopTime>7&&loopTime<8){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(0-oldRotX)*progress
        cube.rotation.y=oldRotY+(0-oldRotY)*progress
        cube.rotation.z=oldRotZ+(0-oldRotZ)*progress
    }
    



    // if(loopTime<p1&&loopTime>0){
    //     individLoop=null
    //     //oblivion to dot
    //     allotTime(cube.scale,"x",1,animationDuration)
    //     allotTime(cube.scale,"y",1,animationDuration)
    //     allotTime(cube.scale,"z",1,animationDuration)
        
    // }
    // if(loopTime<p2&&loopTime>p1+1){
    //     individLoop=null
    //     //dot to rod
    //     allotTime(cube.scale,"z",targetScale,animationDuration)
        
    // }

    // if(loopTime>p2&&loopTime<p2+1){
    //     //cube.rotation.z=oldRotZ+(pi/2-oldRotZ)*progress
    // }

    // if(loopTime<p3&&loopTime>p2+1){
    //     individLoop=null
    //     //rod to plane
    //     allotTime(cube.scale,"x",targetScale,animationDuration)
    //     console.log(progress);
    // }
    

    // if(loopTime<p4&&loopTime>p3+1){
    //     individLoop=null
    //     //plane to box
    //     allotTime(cube.scale,"y",targetScale,animationDuration)
    // }
    // if(loopTime<p5&&loopTime>p4+1){
    //     individLoop=null
    //     //box to oblivion
    //     allotTime(cube.scale,"x",0,animationDuration)
    //     allotTime(cube.scale,"y",0,animationDuration)
    //     allotTime(cube.scale,"z",0,animationDuration)

    // }
    // if(loopTime>p5&&loopTime<p5+1){

    // }
    // if(loopTime>p5+1){animationStartLoop = null;}
  


    renderer.render(scene, camera);
}

animate();