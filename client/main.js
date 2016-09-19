var scene = new THREE.Scene();
var raycaster = new THREE.Raycaster();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);

var texture = new THREE.TextureLoader().load( 'cards/king_of_hearts2.png' );

var modifier = new THREE.BendModifier();

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.game').appendChild(renderer.domElement);

var createCard = function() {
  var geometry = new THREE.PlaneGeometry(1, 2, 10, 10);
  var material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: texture});
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(2, 0, 0);
  scene.add(mesh);
  return mesh;
};

var card1 = createCard();
var card2 = createCard();

var dealStartingCards = function() {
  var coords = { x: 1, y: 2 };
  var tween = new TWEEN.Tween(coords)
      .to({ x: -0.5, y: -3 }, 1100)
      .start();

  var coords2 = { x: 1, y: 2 };
  var tween2 = new TWEEN.Tween(coords2)
    .to({ x: 0.5, y: -3 }, 1100)
    .start();

  tween.onUpdate( function() {
    card1.position.set(coords.x, coords.y, 0);
    card1.rotation.set(card1.rotation.x, card1.rotation.y, card1.rotation.z + 0.1);

    card2.position.set(coords2.x, coords2.y, 0);
    card2.rotation.set(card2.rotation.x, card2.rotation.y, card2.rotation.z + 0.1);
  });
};

dealStartingCards();

function render() {
  TWEEN.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
