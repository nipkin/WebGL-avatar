var camera, scene, renderer;
var geometry, material, particle, line;
//var mouseX = 0, mouseY = 0;
var controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var visualizer = document.getElementById("visualizer");
var keyboard;

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
    keyboard = new THREEx.KeyboardState( renderer.domElement);

    initAvatar();
    initLandscape();
    //document.addEventListener('mousemove', onDocumentMouseMove, false);
}

/*
function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}
*/

//Avatar
var avatarLegsArr = [];
var avatarArmsArr = [];
var avatar = [];
var avatarLeftRotationValue = -0.009;
var avatarRightRotationValue = 0.009;
var landscapeVisualizer;


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

    avatarLegsArr[0].position.x = 5;
    avatarLegsArr[1].position.x = -5;
    avatarLegsArr[0].position.y = avatarLegsArr[1].position.y = -20;
    avatarLegsArr[1].rotation.x = avatarLegsArr[0].rotation.x = 3.15;
}

var initAvatarHead = function() {
    var headGeometry = new THREE.BoxGeometry(10, 10, 10);
    var headMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var headVisualizer = new THREE.Mesh(headGeometry, headMaterial);
    headVisualizer.add(camera);

    avatar.push(headVisualizer);
    scene.add(headVisualizer);

    headVisualizer.position.y = 25;
}

var initAvatarArms = function() {

    for(var i = 0; i < 2; i++) {
        var armsGeometry = new THREE.BoxGeometry(7, 7, 30);
        armsGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( 0, 0, 15 ))
        var armsMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        var armsVisualizer = new THREE.Mesh(armsGeometry, armsMaterial);

        avatar.push(armsVisualizer);
        avatarArmsArr.push(armsVisualizer);
        scene.add(armsVisualizer);
    }

    avatarArmsArr[0].position.x = 13;
    avatarArmsArr[1].position.x = -13;
    avatarArmsArr[0].position.y = avatarArmsArr[1].position.y = 15;
    avatarArmsArr[0].position.z = avatarArmsArr[1].position.z = 0;
    avatarArmsArr[1].rotation.x = avatarArmsArr[0].rotation.x = 5;
    avatarArmsArr[1].rotation.x = avatarArmsArr[0].rotation.x = 1.60;

}

var initAvatarBody = function () {

    var bodyGeometry = new THREE.BoxGeometry(20, 40, 10);
    var bodyMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var bodyVisualizer = new THREE.Mesh(bodyGeometry, bodyMaterial);

    avatar.push(bodyVisualizer);
    scene.add(bodyVisualizer);
}


var avatarAnimation = function() {
    if(avatarLegsArr[1].rotation.x === 3.6989999999999936) {
        avatarLeftRotationValue  = -0.009;
    } else if(avatarLegsArr[1].rotation.x === 2.5650000000000066) {
        avatarLeftRotationValue  = 0.009;
    }

    if(avatarLegsArr[0].rotation.x === 3.6989999999999936) {
        avatarRightRotationValue = -0.009;
    } else if(avatarLegsArr[0].rotation.x === 2.5650000000000066) {
        avatarRightRotationValue = 0.009;
    }

    avatarLegsArr[1].rotation.x += avatarLeftRotationValue;
    avatarLegsArr[0].rotation.x += avatarRightRotationValue;
    avatarArmsArr[0].rotation.x += avatarLeftRotationValue;
    avatarArmsArr[1].rotation.x += avatarRightRotationValue;
}

var avatarArmsAnimation = function() { 
    if(avatarArmsArr[1].rotation.x === 3.6989999999999936) {
        leftLegRotationValue = -0.009;
    } else if(avatarArmsArr[1].rotation.x === 2.5650000000000066) {
        leftLegRotationValue = 0.009;
    }

    if(avatarArmsArr[0].rotation.x === 3.6989999999999936) {
        rightLegRotationValue = -0.009;
    } else if(avatarArmsArr[0].rotation.x === 2.5650000000000066) {
        rightLegRotationValue = 0.009;
    }
    console.log(avatarLegsArr[1].rotation.x)
    avatarLegsArr[1].rotation.x += leftLegRotationValue;
    avatarLegsArr[0].rotation.x += rightLegRotationValue;

}

//Landscape
var initLandscape = function() {
    var landscapeometry = new THREE.BoxGeometry(1000, 1, 1000);
    var landscapMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    landscapeVisualizer = new THREE.Mesh(landscapeometry, landscapMaterial);

    landscapeVisualizer.position.y = -50;

    scene.add(landscapeVisualizer);
}

//Controls
var updateFcts  = [];
    renderer.domElement.setAttribute("tabIndex", "0");
    renderer.domElement.focus();
    
    updateFcts.push(function(delta, now){
        if( keyboard.pressed('left') ){
            avatar[i].rotation.y -= 1 * delta;           
        }else if( keyboard.pressed('right') ){
            avatar[i].rotation.y += 1 * delta;
        }
        if( keyboard.pressed('down') ){
            avatar[i].rotation.x += 1 * delta;       
        }else if( keyboard.pressed('up') ){
            avatar[i].rotation.x -= 1 * delta;       
        }
    })

    // only on keydown
   /* keyboard.domElement.addEventListener('keydown', function(event){
        if( keyboard.eventMatches(event, 'w') ) mesh.scale.y    /= 2
        if( keyboard.eventMatches(event, 's') ) mesh.scale.y    *= 2
    })
    // only on keyup
    keyboard.domElement.addEventListener('keyup', function(event){
        if( keyboard.eventMatches(event, 'a') ) mesh.scale.x    *= 2
        if( keyboard.eventMatches(event, 'd') ) mesh.scale.x    /= 2
    })*/

    //////////////////////////////////////////////////////////////////////////////////
    //      render the scene                        //
    //////////////////////////////////////////////////////////////////////////////////

/*
    function render() {
    
    requestAnimationFrame(render);
    //camera.position.x += ( - mouseX - camera.position.x ) * .20;
    //camera.position.y += ( mouseY - camera.position.y ) * .20;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}*/


    //////////////////////////////////////////////////////////////////////////////////
    //      loop runner                         //
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec    = lastTimeMsec || nowMsec-1000/60
        var deltaMsec   = Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec    = nowMsec
        // call each update function
        updateFcts.forEach(function(updateFn){
            updateFn(deltaMsec/1000, nowMsec/1000)
        })
    })

/*
document.addEventListener( "keydown", doKeyDown, true);
document.addEventListener( "keyup", doKeyUp, true);

function doKeyDown(e) {

    for(i in avatar) {
        if(e.keyCode == "87") {
            if(avatar[i].position.z > -500) {
                avatarAnimation();
                avatar[i].position.z += -4;
            }
        }
        if(e.keyCode == "83") {
            if(avatar[i].position.z < 500) {
                avatarAnimation();
                avatar[i].position.z += 4;
            }
        }

        if(e.keyCode == "68") {
            if(avatar[i].position.x < 500) {
                avatarAnimation();
                avatar[i].position.x += 4;
            }
        }
        if(e.keyCode == "65") {
            if(avatar[i].position.x > -500) { 
                avatarAnimation();
                avatar[i].position.x -= 4;
            }
        }
    }

    if(e.keyCode == "32") {
      
    }  
}

function doKeyUp(e) {
    avatarLegsArr[1].rotation.x = avatarLegsArr[0].rotation.x = 3.15;
    avatarArmsArr[1].rotation.x = avatarArmsArr[0].rotation.x = 1.60;
}
*/

init();
    updateFcts.push(function(){
        renderer.render( scene, camera );       
    })
//render();


//if(avatar[0].position.y < -5 && avatar[1].position.y < -5 && avatar[2].position.y < 40 && avatar[3].position.y < 30 && avatar[4].position.y < 30 && avatar[5].position.y < 15){}