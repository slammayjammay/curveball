var canvasWidth, canvasHeight;
var scene, camera, renderer;
var ball;

init = function () {
  canvasWidth = $('#canvas').width();
  canvasHeight = $('#canvas').height();
  var container = document.getElementById('canvas');
  document.body.appendChild(container);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(canvasWidth, canvasHeight);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, canvasWidth / canvasHeight, 1, 1000);
  camera.position.z = 25;

  ////////////// LIGHT
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  directionalLight.position.set(1.5, .5, 1);
  scene.add(directionalLight);
  var ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  ////////////// BALL
  var geom = new THREE.SphereGeometry(3, 20, 20);
  var mat = new THREE.MeshPhongMaterial({
    color: 0x007f00,
    shading: THREE.SmoothShading,
    shininess: 40
  });
  var ball = new THREE.Mesh(geom, mat);
  scene.add(ball);

  ////////////// WALLS
  var distance = -50;
  var wallWidth = 60;
  var wallHeight = 40;

  var sideGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, 1);
  var floorGeometry = new THREE.BoxGeometry(wallWidth, wallWidth, 1);
  var wallMaterial = new THREE.MeshPhongMaterial({
    color: 0xa8a8a8,
    shading: THREE.SmoothShading,
    shininess: 40,
    transparent: true,
    opacity: .5
  });

  var backWallMesh = new THREE.Mesh(sideGeometry.clone(), wallMaterial.clone());
  backWallMesh.position.z = distance;
  scene.add(backWallMesh);

  var leftWallMesh = new THREE.Mesh(sideGeometry.clone(), wallMaterial.clone());
  leftWallMesh.rotation.y = Math.PI / 2;
  leftWallMesh.position.x -= wallWidth / 2;
  leftWallMesh.position.z = distance / 2;
  scene.add(leftWallMesh);

  var rightWallMesh = new THREE.Mesh(sideGeometry.clone(), wallMaterial.clone());
  rightWallMesh.rotation.y = Math.PI / 2;
  rightWallMesh.position.x += wallWidth / 2;
  rightWallMesh.position.z = distance / 2;
  scene.add(rightWallMesh);

  var floorMesh = new THREE.Mesh(floorGeometry.clone(), wallMaterial.clone());
  floorMesh.rotation.x = Math.PI / 2;
  floorMesh.rotation.z = Math.PI / 2;
  floorMesh.position.y -= wallHeight / 2;
  floorMesh.position.z = distance / 2;
  scene.add(floorMesh);

  var ceilingMesh = new THREE.Mesh(floorGeometry.clone(), wallMaterial.clone());
  ceilingMesh.rotation.x = Math.PI / 2;
  ceilingMesh.rotation.z = Math.PI / 2;
  ceilingMesh.position.y += wallHeight / 2;
  ceilingMesh.position.z = distance / 2;
  scene.add(ceilingMesh);

  // function animate() {
  //   requestAnimationFrame(animate);
    renderer.render(scene, camera);
  // }
  // animate();
};