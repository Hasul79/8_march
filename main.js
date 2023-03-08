
let renderer,
  scene,
  camera,
  cubes = [],
  groups = [];
let geometry = new THREE.BoxGeometry(30, 30, 30);
let offset = 35;
let animation = new TimelineMax({ repeat: -1, delay: 2 }); //repeat0
let sizeGear = document.querySelectorAll(".gear")[0].getBoundingClientRect();
let gearW = 360; //sizeGear.width;
let gearH = 360; //sizeGear.height;

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  //camera = new THREE.PerspectiveCamera(45, gearW / gearH, 1, 1000);
  camera = new THREE.PerspectiveCamera(40, gearW / gearH, 1, 1000);
  camera.position.y = 400; //150
  camera.position.z = 800; //400;
  camera.lookAt(scene.position);
}

function initLights() {
  let light1 = new THREE.DirectionalLight(0xaa0201, 0.85);
  light1.position.set(100, 100, 200);
  scene.add(light1);

  let light = new THREE.DirectionalLight(0xaa0201, 0.85);
  light.position.set(-100, 100, 200);
  scene.add(light);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(gearW, gearH);
  renderer.setClearColor(0x000000, 0);
  document.querySelectorAll(".gear")[0].appendChild(renderer.domElement);
}

/* ANY LETTER */
function createHeartLet() {
  heart = new THREE.Group();
  scene.add(heart);
  createLevelLet(10, [-35, 0, 35]);
  createLevelLet(9, [-70, 70]);
  createLevelLet(8, [-105, -70, 70, 105]);
  createLevelLet(7, [-105, -70, 70, 105]);
  createLevelLet(6, [-70, 70]);
  createLevelLet(5, [-35, 0, 35]);
  createLevelLet(4, [-70, 70]);
  createLevelLet(3, [-105, -70, 70, 105]);
  createLevelLet(2, [-105, -70, 70, 105]);
  createLevelLet(1, [-70, 70]);
  createLevelLet(0, [-35, 0, 35]);
}

function createLevelLet(level, arr) {
  let group = new THREE.Group();
  group.level = level;
  let color = 0xaa0201; //0xE31749;
  heart.add(group);
  groups.push(group);
  group.position.y = -150 + offset * level;
  let x = 0;

  for (let i = 0; i < arr.length; ++i) {
    x = arr[i];
    if (level % 2) {
      color = 0xffffff; //0xF22C5D;
    }

    let material = new THREE.MeshPhongMaterial({ color: color });
    let cube0 = new THREE.Mesh(geometry, material);
    let cube1 = new THREE.Mesh(geometry, material);
    cubes.push(cube0, cube1);
    cube0.position.set(x, 0, offset / 1.5);
    cube1.position.set(x, 0, -offset / 1.5);
    group.add(cube0);
    group.add(cube1);
  }
} 

function fitToHeart() {
  let animation = new TimelineMax();
  for (let i = 0, len = cubes.length; i < len; ++i) {
    let cube = cubes[i];
    let x = cube.position.x;
    let y = cube.position.y;
    let z = cube.position.z;
    cube.position.x = parseInt((-1 + 2 * Math.random()) * gearW);
    cube.position.y = parseInt((-1 + 2 * Math.random()) * gearH);
    cube.position.z = parseInt((-1 + 2 * Math.random()) * 150);
    animation.to(
      cube.position,
      2,
      { x: x, y: y, z: z, ease: Expo.easeInOut },
      0
    );
  }
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

let ru = 0;
function count() {
  let counter = { val: 0, roundProps: 0 };
  TweenMax.to(counter, 5, {
    val: 30,
    roundProps: "val",
    onUpdate: function () {
      //console.log( Math.ceil(counter.val), counter.roundProps++ );
    },
    onComplete: function () {
      count();
      ru++;
    }
    //ease:Circ.easeInOut
  });
}

function lastRandom() {
  let min = 0;
  let max = 3;
  let random;
  let lastRandom = window["localStorage"]["oblivion"].substr(-1);
  if (lastRandom === undefined) {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    random = Math.floor(Math.random() * (max - min)) + min;
    if (random >= lastRandom) random += 1;
  }
  lastRandom = random;
  return lastRandom;
}

function rotateHeart() {
  let rvar = 4; //lastRandom();
  let ls = window["localStorage"];
  isNaN(ls["oblivion"]) ? (ls["oblivion"] = 0) : (ls["oblivion"] += rvar);
  ls["oblivion"].substr(-1) === rvar ? (rvar = 0) : "";
  count();
  if (rvar === 0) {
  }
  if (rvar === 1) {
    for (let i = 0, len = groups.length; i < len; ++i) {
      let group = groups[i];
      let ran = i % 2 === 0 ? "-" : "";
      animation
        .to(
          group.rotation,
          0.5,
          { y: -0.05 * group.level },
          0.025 * group.level
        )
        .to(
          group.rotation,
          1.5,
          { y: (2 * Math.PI) / 2, delay: 0.5, ease: Expo.easeInOut },
          0.1 * group.level
        );
    }
  }
  if (rvar === 2) {
    for (let i = 0, len = groups.length, r = len - 1; i < len; ++i, r--) {
      let group = groups[i];
      let groupR = groups[r];
      let ran = i % 2 === 0 ? "-" : "";
      animation
        .to(
          groupR.rotation,
          0.5,
          { y: 0.05 * group.level },
          0.025 * groupR.level
        )
        .to(
          group.rotation,
          1.25,
          { y: -Math.PI, delay: 0.5, ease: Expo.easeInOut },
          0.05 * group.level
        );
    }
  }
  if (rvar === 3) {
    for (var c = 0, len = cubes.length; c < len; ++c) {
      let cube = cubes[c];
      let ran = i % 2 === 0 ? "-" : "";
      animation
        .to(cube.rotation, 0.5, { x: -0.5, y: -0.5 }, 0)
        .to(
          cube.rotation,
          1.5,
          { x: Math.PI, y: 0, delay: 0.5, ease: Expo.easeInOut },
          0.75 * cube.level
        );
    }
  }
  for (let i = 0, len = groups.length, r = len - 1; i < len; ++i, r--) {
    let group = groups[i];
    let groupR = groups[r];
    let ran = i % 2 === 0 ? "-" : "";
    //console.log( i, r );
    animation
      .to(group.rotation, 0.2, { x: -0.05 * group.level }, 0)
      .to(
        group.rotation,
        2.5,
        { x: 2 * Math.PI, ease: Expo.easeInOut, delay: 0.2 },
        0.05 * group.level
      )
      .to(
        groupR.rotation,
        1.5,
        { y: 2 * Math.PI, ease: Expo.easeInOut, delay: 2 },
        0.025 * group.level
      );
  }
}

initScene();
initCamera();
initLights();
initRenderer();
createHeartLet();
fitToHeart();
rotateHeart();
render();
