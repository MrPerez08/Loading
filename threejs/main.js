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

//THIS IS THE NEW REFRESHING SEXY AND DELICIOUS allottime() function WITH OBJECT REFERENCE ABILITIES!!!!!
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

let progress=0;
let oldRotX=0;
let oldRotY=0;
let oldRotZ=0;
let individLoop=null;




//const audio = new Audio('sounds.mp3');
const audio = new Audio('sounds2.mp3');

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
    if (audioElement.readyState > 0) {
        setupPlayback();
    } else {
        audioElement.addEventListener('loadedmetadata', setupPlayback);
    }
    
    function setupPlayback() {
        audioElement.currentTime = startTime;
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.play().catch(e => console.error("Playback failed:", e));
    }
}







let play=false
function animate() {
    function easeFunc(x){return (Math.pow((x*(2-x)),2))} //Converts my linear 'progress' values to whatever the power you set it to (this allows for easing)

    requestAnimationFrame(animate);
    if (animationStartLoop === null) {
        animationStartLoop = Date.now();
        initCamZ=100
        initLightZ=20
    }
    let loopTime = (Date.now() - animationStartLoop) / 1000;

    if (individLoop === null) {
        individLoop = Date.now();
        oldRotX=cube.rotation.x;
        oldRotY=cube.rotation.y;
        oldRotZ=cube.rotation.z;
    }
    let rotationTime = (Date.now() - individLoop) / 1000;


    progress= rotationTime/1
    progress=easeFunc(progress)

    console.log(progress)

    if(loopTime<1&&loopTime>0){
        cube.scale.x=.1
        cube.scale.y=.1
        cube.scale.z=.1

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
        
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    }
    if(loopTime<2&&loopTime>1){
        cube.rotation.x=oldRotX+(0-oldRotX)*progress
        cube.rotation.y=oldRotY+(0-oldRotY)*progress
        cube.rotation.z=oldRotZ+(0-oldRotZ)*progress
        play=true
    }
    
    if(loopTime>2&&loopTime<3){
        if(play){
            //playClip(0.1, 0.7, audio);
            playClip(.8, 1.25, audio);
        }
        play=false
        cube.scale.z=10
        camera.position.z=initCamZ+cube.scale.z/2
        directionalLight.position.z=initLightZ+cube.scale.z/2
        directionalLightHelper.position.z=initLightZ+cube.scale.z/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    }
    if(loopTime>3&&loopTime<4){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi/2-oldRotY)*progress
        cube.rotation.z=oldRotZ+(pi-oldRotZ)*progress
        play=true
    }
    if(loopTime>4&&loopTime<5){
        if(play){
            //playClip(0.9, 1.5, audio);
            playClip(1.3, 1.8, audio);
        }
        play=false
        cube.scale.x=10
        camera.position.z=initCamZ+cube.scale.x/2
        directionalLight.position.z=initLightZ+cube.scale.x/2
        directionalLightHelper.position.z=initLightZ+cube.scale.x/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    }
    if(loopTime>5&&loopTime<6){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi/2-oldRotX)*progress
        cube.rotation.y=oldRotY+(0-oldRotY)*progress
        cube.rotation.z=oldRotZ+(0-oldRotZ)*progress
        play=true
    }
    if(loopTime>6&&loopTime<7){
        if(play){
            //playClip(2.7, 3, audio);
            playClip(2, 2.4, audio);
        }
        play=false
        cube.scale.y=10
        camera.position.z=initCamZ+cube.scale.y/2
        directionalLight.position.z=initLightZ+cube.scale.y/2
        directionalLightHelper.position.z=initLightZ+cube.scale.y/2

        cube.rotation.x+=.01
        cube.rotation.y+=.01
        cube.rotation.z+=.01
        individLoop=null
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    } 
    if(loopTime>7&&loopTime<8){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi-oldRotY)*progress
        cube.rotation.z=oldRotZ+(pi-oldRotZ)*progress
        allotTime(cube.scale,"x",0,animationDuration)
        allotTime(cube.scale,"y",0,animationDuration)
        allotTime(cube.scale,"z",0,animationDuration)
        play=true
        if(loopTime<7.2){
            if(play){playClip(4.4, 5, audio);}
            play=false
        }
    }
    if(loopTime>8){
        animationStartLoop=null
    }


    renderer.render(scene, camera);
}

animate();