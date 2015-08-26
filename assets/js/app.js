var camera, scene, renderer;
var geometry, material, particle, line;
//var mouseX = 0, mouseY = 0;
var controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var visualizer = document.getElementById("visualizer");

function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 7000);
    camera.position.z = 800;
    
    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight( 0x555555 );
    scene.add(ambient);

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position = camera.position;
    scene.add(light);


    renderer = new THREE.WebGLRenderer({canvas: visualizer, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 10);

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    initAvatar();
    //document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function render() {
    
    requestAnimationFrame(render);
    //camera.position.x += ( - mouseX - camera.position.x ) * .20;
    //camera.position.y += ( mouseY - camera.position.y ) * .20;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

/*
function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}
*/

//Avatar
 
var avatarLegsArr = [];
var avatarHead;
var avatarArmsArr = [];
var avatarLegs;
var avatar = [];
var legRotationValue;


var initAvatar = function() {
    initAvatarLegs();
    initAvatarHead();
    initAvatarArms();
    initAvatarBody();
};

var initAvatarLegs = function() {

    for(var i = 0; i < 2; i++) {
        var legGeometry = new THREE.BoxGeometry(10, 30, 10);
        legGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( 0, 30/2, 0 ))
        var legMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        var legVisualizer = new THREE.Mesh(legGeometry, legMaterial);

        avatarLegsArr.push(legVisualizer);
        avatar.push(legVisualizer);
        scene.add(legVisualizer);
    }

    avatarLegsArr[0].position.x = 15;
    avatarLegsArr[1].position.x = -15;
    avatarLegsArr[0].position.y = avatarLegsArr[1].position.y = -15;
    avatarLegsArr[1].rotation.x = 3.7;
}

var initAvatarHead = function() {
    var headGeometry = new THREE.BoxGeometry(10, 10, 10);
    var headMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var headVisualizer = new THREE.Mesh(headGeometry, headMaterial);

    avatar.push(headVisualizer);
    scene.add(headVisualizer);

    headVisualizer.position.y = 25;
}

var initAvatarArms = function() {

    for(var i = 0; i < 2; i++) {
        var armsGeometry = new THREE.BoxGeometry(7, 7, 30);
        var armsMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        var armsVisualizer = new THREE.Mesh(armsGeometry, armsMaterial);

        avatar.push(armsVisualizer);
        avatarArmsArr.push(armsVisualizer);
        scene.add(armsVisualizer);
    }

    avatarArmsArr[0].position.x = 13;
    avatarArmsArr[1].position.x = -13;
    avatarArmsArr[0].position.y = avatarArmsArr[1].position.y = 10;
    avatarArmsArr[0].position.z = avatarArmsArr[1].position.z = 10;

}

var initAvatarBody = function () {

    var bodyGeometry = new THREE.BoxGeometry(20, 40, 10);
    var bodyMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var bodyVisualizer = new THREE.Mesh(bodyGeometry, bodyMaterial);

    avatar.push(bodyVisualizer);
    scene.add(bodyVisualizer);
}


var avatarAnimation = function() {

    if(avatarLegsArr[1].rotation.x >= 3.6) {
        legRotationValue = -0.05;
    } else if(avatarLegsArr[1].rotation.x <= 2.6) {
        legRotationValue = 0.05;
    }

    avatarLegsArr[1].rotation.x += legRotationValue;
}

//Controls

//var canvas = document.getElementById("visualizer");
document.addEventListener( "keydown", doKeyDown, true);

function doKeyDown(e) {
    if(e.keyCode == "87") {
        for(i in avatar) {
            avatarAnimation();
            //avatar[i].position.x += 1;
        }
    }
}

init();
render();