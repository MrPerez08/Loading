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

    

    console.log(loopTime)

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
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    }
    if(loopTime>3&&loopTime<4){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi-oldRotY)*progress
        cube.rotation.z=oldRotZ+(pi-oldRotZ)*progress
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
        oldRotX = cube.rotation.x
        oldRotY = cube.rotation.y
        oldRotZ = cube.rotation.z
    }
    if(loopTime>5&&loopTime<6){
        initCamZ=camera.position.z
        initLightZ=directionalLight.position.z
        cube.rotation.x=oldRotX+(pi-oldRotX)*progress
        cube.rotation.y=oldRotY+(pi-oldRotY)*progress
        cube.rotation.z=oldRotZ+(pi-oldRotZ)*progress
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
    }
    if(loopTime>8){animationStartLoop=null}


    renderer.render(scene, camera);
}

animate();