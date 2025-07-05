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
//scene.add(directionalLightHelper);


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



let animationStartLoop =null;
let animationStartTime = null;
const animationDuration = 1; // seconds





//const audio = new Audio('sounds.mp3');
const audio = new Audio('assets/sounds2.mp3');

function playClip(startTime, endTime, audioElement) {
    // Remove any existing timeupdate listeners to prevent duplicates
    audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    
    function handleTimeUpdate() {
        if (audioElement.currentTime >= endTime) {
            audioElement.pause();
            audioElement.currentTime = startTime; // Reset to start
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }
    
    // If metadata is already loaded, set up immediately
    if (audioElement.readyState > 0) {setupPlayback();} 
    else {audioElement.addEventListener('loadedmetadata', setupPlayback);}
    
    function setupPlayback() {
        audioElement.currentTime = startTime;
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.play().catch(e => console.error("Playback failed:", e));
    }
}


// helper function that automatically calculates the next multiple of pi/2 that is JUST bigger than the angle the object is at




function allotTime(object, property, targetValue, duration) {
    // If animation hasn't started yet, initialize it
    if (animationStartTime === null) {
        animationStartTime = Date.now();
        object.initialValue = object[property]; // Store initial value
    }
    
    // Calculate elapsed time in seconds
    const elapsedTime = (Date.now() - animationStartTime) / 1000;
    
    // If animation is still running
    if (elapsedTime < duration) {
        // Calculate progress (0 to 1)
        const progress = elapsedTime / duration;
        
        // Interpolate the value (linear interpolation)
        object[property] = object.initialValue + (targetValue - object.initialValue) * progress;
    } else {
        // Animation complete - ensure final value is set
        object[property] = targetValue;
        animationStartTime = null; // Reset for next animation
    }
    
}
    
let progress=0;
let oldRotX=0;
let oldRotY=0;
let oldRotZ=0;
let individLoop=null;


const phaseLength=1
let switcher = true
let p1=phaseLength
let p2=phaseLength*2
let p3=phaseLength*3
let p4=phaseLength*4
let p5=phaseLength*5


function needToRotate(object, mx,my,mz) {
    object.rotation.x=oldRotX+(mx-oldRotX)*progress
    object.rotation.y=oldRotY+(my-oldRotY)*progress
    object.rotation.z=oldRotZ+(mz-oldRotZ)*progress
}

function easeFunc(x){return (Math.pow((x*(2-x)),.5))}   //Converts my linear 'progress' values to whatever the power you set it to (this allows for easing)



let currentPhase = 0; // Track phases explicitly

function animate() {
    requestAnimationFrame(animate);
    const now = Date.now();

    // Initialize animation
    if (animationStartLoop === null) {
        animationStartLoop = now;
        initCamZ = 100;
        initLightZ = 20;
    }

    const loopTime = (now - animationStartLoop) / 1000;

    // Detect phase changes
    if (loopTime < p1 && currentPhase !== 1) {
        currentPhase = 1;
        individLoop = now; // Reset timer for Phase 1
        oldRotX = cube.rotation.x;
        oldRotY = cube.rotation.y;
        oldRotZ = cube.rotation.z;
        cube.scale.set(.1, .1, .1);
    } 
    else if (loopTime >= p1 && loopTime < p2 && currentPhase !== 2) {
        currentPhase = 2;
        individLoop = now; // Reset timer for Phase 2
        oldRotX = cube.rotation.x;
        oldRotY = cube.rotation.y;
        oldRotZ = cube.rotation.z;
        cube.scale.z = 10;
        camera.position.z = initCamZ + cube.scale.z / 2;
        directionalLight.position.z = initLightZ + cube.scale.z / 2;
    }
    else if (loopTime >= p2 && loopTime < p3 && currentPhase !== 3) {
        currentPhase = 3;
        individLoop = now; // Reset timer for Phase 2
        oldRotX = cube.rotation.x;
        oldRotY = cube.rotation.y;
        oldRotZ = cube.rotation.z;
        cube.scale.x=10
        camera.position.z=initCamZ+cube.scale.x/2
        directionalLight.position.z=initLightZ+cube.scale.x/2
        directionalLightHelper.position.z=initLightZ+cube.scale.x/2
    }
    else if (loopTime >= p3 && loopTime < p4 && currentPhase !== 4) {
        currentPhase = 4;
        individLoop = now; // Reset timer for Phase 2
        oldRotX = cube.rotation.x;
        oldRotY = cube.rotation.y;
        oldRotZ = cube.rotation.z;
        cube.scale.y=10
        camera.position.z=initCamZ+cube.scale.y/2
        directionalLight.position.z=initLightZ+cube.scale.y/2
        directionalLightHelper.position.z=initLightZ+cube.scale.y/2
    }
    else if (loopTime >= p4 && loopTime < p5 && currentPhase !== 5) {
        currentPhase = 5;
        individLoop = now; // Reset timer for Phase 2
        oldRotX = cube.rotation.x;
        oldRotY = cube.rotation.y;
        oldRotZ = cube.rotation.z;
        allotTime(cube.scale,"x",0,animationDuration)
        allotTime(cube.scale,"y",0,animationDuration)
        allotTime(cube.scale,"z",0,animationDuration)
    }


    // Calculate progress (smooth over phase duration)
    const rotationTime = (now - individLoop) / 1000;
    progress = easeFunc(Math.min(rotationTime / phaseLength, 1)); // Clamp to [0, 1]

    // Apply rotations
    if (currentPhase === 1) {
        needToRotate(cube, 0, 0, 0); // Phase 1 target rotation
    } 
    else if (currentPhase === 2) {
        needToRotate(cube, 0,pi/2, 0); // Phase 2 target rotation
    }else if (currentPhase ===3){
        needToRotate(cube, pi/2,2*pi/2, 0);
    }
    else if (currentPhase === 4){
        needToRotate(cube, 2*pi/2,2*pi/2, pi/2);
    }
    

    // Loop animation
    if (loopTime > p4) animationStartLoop = null;

    renderer.render(scene, camera);
}

animate();