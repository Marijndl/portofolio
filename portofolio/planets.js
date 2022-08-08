function planet(r,size){
    const geometry = new THREE.SphereGeometry(size, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.setZ(r);
    scene.add(planet);
    return planet
  }
  
  function update_pos(planet,size,time1){
    planet.position.x = size * Math.sin(time1);
    planet.position.z = size * Math.cos(time1);
  
  }