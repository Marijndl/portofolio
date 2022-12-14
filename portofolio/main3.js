import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//FUNCTIONS
class planet {
    constructor(speed,size,radius,texture) {
        this.speed = speed;
        this.size = size;
        this.radius = radius;
        
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(this.size, 24, 24),
            new THREE.MeshStandardMaterial({ map: texture })
        );
        this.planet = planet;
        planet.position.setZ(this.radius);
        scene.add(this.planet);
        //return planet;
    }
    
    update_pos(time,multiplier){
        this.planet.position.x = this.radius * Math.sin((multiplier/this.speed)*time);
        this.planet.position.z = this.radius * Math.cos((multiplier/this.speed)*time);
  }
}

  function update_moon(planet,moon,r,speed,time1){
    moon.position.x = planet.position.x + r * Math.sin(speed*time1);
    moon.position.z = planet.position.z + r * Math.cos(speed*time1);
  
  }


// --------------------------------------------------------Code-----------------------------------------------------------//



// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setY(130);
camera.position.setX(-200);
camera.position.setZ(-100);

renderer.render(scene, camera);

//background
const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = spaceTexture;

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
torus.position.setZ(50);

//scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Helpers and controls for panning around :)
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
const controls = new OrbitControls(camera, renderer.domElement);

//make a new planet

const mercury_texture =     new THREE.TextureLoader().load('mercury.jpg');
const venus_texture =       new THREE.TextureLoader().load('venus.jpg');
const earth_texture =       new THREE.TextureLoader().load('earth.jpg');
const mars_texture =        new THREE.TextureLoader().load('mars.jpg');
const jupiter_texture =     new THREE.TextureLoader().load('jupiter.jpg');
const saturn_texture =    new THREE.TextureLoader().load('saturn.jpg');
const uranus_texture =      new THREE.TextureLoader().load('uranus.jpg');
const neptune_texture =     new THREE.TextureLoader().load('neptune.jpg');

const mercury = new planet(88,2.44,20,mercury_texture);
const venus = new planet(225,6,29,venus_texture);
const earth = new planet(365,6.4,42,earth_texture);
const mars = new planet(687,3.4,53,mars_texture);
const jupiter = new planet(11.86*365,69.91,126,jupiter_texture);
const saturn = new planet(29.45*365,58.2,256,saturn_texture);
const uranus = new planet(84.02*365,25.1,346,uranus_texture);
const neptune = new planet(164.8*365,24.6,406,neptune_texture);


//var planet_dict = {earth: [365,6.4,15],mercury: [88,2.44,6]}

const planet_list = [mercury,venus,earth,mars,jupiter,saturn,uranus,neptune];
//const moon = planet(15,0.25);

//Midpoint
const geo_midpoint = new THREE.SphereGeometry(1, 24, 24);
const material_mid = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const midpoint = new THREE.Mesh(geo_midpoint, material_mid);
scene.add(midpoint);

// Animation Loop


var time1 = 0;
function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  //torus.position. += 0.1;
  
  torus.position.x = 50 * Math.sin(time1);
  torus.position.z = 50 * Math.cos(time1);
  var multiplier1 = document.getElementById("multiplier").value
  
  for (let i = 0; i < planet_list.length; i++) {
    planet_list[i].update_pos(time1,multiplier1);
  }
  
//   camera.position.x = 150 * Math.sin((multiplier1/365)*time1);
//   camera.position.z = 150 * Math.cos((multiplier1/365)*time1);

  time1 += 0.01;

  controls.update();

  renderer.render(scene, camera);
  }

animate();

