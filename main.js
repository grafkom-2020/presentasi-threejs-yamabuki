function main() {
  const canvas = document.getElementById("canvas_main");

  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setClearColor(new THREE.Color(0.3,0.3,0.4, 0.7));

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.01;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  var r = 1;
  const boxWidth = r;
  const boxHeight =r;
  const boxDepth =r;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const cubes = []; 
  const loader = new THREE.TextureLoader();
  //tex1
  const texture = loader.load('img/b.png');
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  const material = new THREE.MeshBasicMaterial({map: texture});
  //tex2
    // const materials =[
    //     new THREE.MeshBasicMaterial({map: loader.load('img/1.png'),side : THREE.DoubleSide}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img/2.png'),side : THREE.DoubleSide}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img/3.png'),side : THREE.DoubleSide}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img/4.png'),side : THREE.DoubleSide}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img/5.png'),side : THREE.DoubleSide}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img/6.png'),side : THREE.DoubleSide}),
    // ];


    const cube = new THREE.Mesh(geometry, material);
  //const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  cubes.push(cube);  // add to our list of cubes to rotate

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = .2 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}

main();