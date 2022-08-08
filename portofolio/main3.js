import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//FUNCTIONS
class planet {
    constructor(speed,size,radius) {
        this.speed = speed;
        this.size = size;
        this.radius = radius;
        
        const geometry = new THREE.SphereGeometry(this.size, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const planet = new THREE.Mesh(geometry, material);
        this.planet = planet;
        planet.position.setZ(this.radius);
        scene.add(this.planet);
        //return planet;
    }
    
    update_pos(time){
        console.log("tesrtrawd")
        this.planet.position.x = this.radius * Math.sin((100/this.speed)*time);
        this.planet.position.z = this.radius * Math.cos((100/this.speed)*time);
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
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

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

const murcery = new planet(88,2.44,20);
const venus = new planet(225,6,30);
const earth = new planet(365,6.4,40);
const mars = new planet(687,3.4,45);
const jupiter = new planet(11.86*365,69.91,120);
const saturnus = new planet(29.45*365,58.2,250);
const uranus = new planet(84.02*365,25.1,340);
const neptune = new planet(164.8*365,24.6,400);


//var planet_dict = {earth: [365,6.4,15],murcery: [88,2.44,6]}

const planet_list = [murcery,venus,earth,mars,jupiter,saturnus,uranus,neptune];
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
  
  for (let i = 0; i < planet_list.length; i++) {
    planet_list[i].update_pos(time1);
  }
  
  time1 += 0.01;

  controls.update();

  renderer.render(scene, camera);
  }

animate();

