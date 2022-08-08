import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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

scene.add(torus);

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

function planet(r,size){
  const geometry = new THREE.SphereGeometry(size, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.setZ(r);
  scene.add(planet);
  return planet
}

const earth = planet(50,1);

function update_pos(planet,size,time1){
  planet.position.x = size * Math.sin(time1);
  planet.position.z = size * Math.cos(time1);

}

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
  update_pos(earth,50,time1);
  time1 += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();