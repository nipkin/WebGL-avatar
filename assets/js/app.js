var camera, scene, renderer;
var geometry, material, particle, line;
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
    renderer.domElement.setAttribute("tabIndex", "0");
    renderer.domElement.focus();

    initAvatar();
    initLandscape();
}

function render() {
    requestAnimationFrame(render);
    avatarAnimation();
    renderer.render(scene, camera);
}

//Avatar
var avatar = new Object();
var avatarLeftRotationValue = -0.009;
var avatarRightRotationValue = 0.009;
var landscapeVisualizer;
var combinedAvatar;

var initAvatar = function() {
    initAvatarLegs();
    initAvatarHead();
    initAvatarArms();
    initAvatarBody();
    combineAvatar();
};

var combineAvatar = function() {
    combinedAvatar = new THREE.Geometry();

    for(i in avatar) {
        avatar[i].updateMatrix();
        combinedAvatar.merge(avatar[i].geometry, avatar[i].matrix);
    }
    return combinedAvatar;    
}

var initAvatarLegs = function() {

    for(var i = 0; i < 2; i++) {
        var legGeometry = new THREE.BoxGeometry(10, 30, 10);
        legGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -35, 0 ));
        var legMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        var legVisualizer = new THREE.Mesh(legGeometry, legMaterial);

        switch(i) {
            case i = 0:
                avatar.leftLeg = legVisualizer;
                break;
            case i = 1:
                avatar.rightLeg = legVisualizer;
        }

        scene.add(legVisualizer);
    }

    avatar.leftLeg.position.x = 5;
    avatar.rightLeg.position.x = -5;
    //avatar.leftLeg.position.y = avatar.rightLeg.position.y = -50;
}

var initAvatarHead = function() {
    var headGeometry = new THREE.BoxGeometry(10, 10, 10);
    var headMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var headVisualizer = new THREE.Mesh(headGeometry, headMaterial);
    headVisualizer.add(camera);

    avatar.head = headVisualizer;
    scene.add(headVisualizer);

    avatar.head.position.y = 25;
}

var initAvatarArms = function() {

    for(var i = 0; i < 2; i++) {
        var armsGeometry = new THREE.BoxGeometry(7, 30, 7);
        armsGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
        var armsMaterial = new THREE.MeshBasicMaterial({wireframe: true});
        var armVisualizer = new THREE.Mesh(armsGeometry, armsMaterial);

        switch(i) {
            case i = 0:
                avatar.leftArm = armVisualizer;
                break;
            case i = 1:
                avatar.rightArm = armVisualizer;
        }

        scene.add(armVisualizer);
    }

    avatar.rightArm.position.x = 13;
    avatar.leftArm.position.x = -13;
    avatar.rightArm.position.y = avatar.leftArm.position.y = -15;
    avatar.rightArm.position.z = avatar.leftArm.position.z = 0;



}

var initAvatarBody = function () {

    var bodyGeometry = new THREE.BoxGeometry(20, 40, 10);
    var bodyMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    var bodyVisualizer = new THREE.Mesh(bodyGeometry, bodyMaterial);

    avatar.body = bodyVisualizer;
    scene.add(bodyVisualizer);
}

//Landscape
var initLandscape = function() {
    var landscapeometry = new THREE.BoxGeometry(1000, 1, 1000);
    var landscapMaterial = new THREE.MeshBasicMaterial({wireframe: true});
    landscapeVisualizer = new THREE.Mesh(landscapeometry, landscapMaterial);

    landscapeVisualizer.position.y = -50;

    scene.add(landscapeVisualizer);
}

//Animation
var avatarAnimation = function() {
    if(avatar.rightLeg.rotation.x === 3.6989999999999936) {
        avatarLeftRotationValue  = -0.009;
    } else if(avatar.rightLeg.rotation.x === 2.5650000000000066) {
        avatarLeftRotationValue  = 0.009;
    }

    if(avatar.leftLeg.rotation.x === 3.6989999999999936) {
        avatarRightRotationValue = -0.009;
    } else if(avatar.leftLeg.rotation.x === 2.5650000000000066) {
        avatarRightRotationValue = 0.009;
    }

    avatar.rightLeg.rotation.x += avatarLeftRotationValue;
    avatar.leftLeg.rotation.x += avatarRightRotationValue;
    avatar.leftArm.rotation.x += avatarLeftRotationValue;
    avatar.rightArm.rotation.x += avatarRightRotationValue;
}

var avatarMoveForward = function(avatarPart, delta) {
    var returnValue;

    if(avatarPart == avatar.leftLeg || avatarPart == avatar.rightLeg) {
        returnValue = avatarPart.translateZ( -100 * delta );
    }
    else if(avatarPart == avatar.leftArm || avatarPart == avatar.rightArm) {
        returnValue = avatarPart.translateZ( -100 * delta);
        console.log(avatarPart.translateZ( -100 * delta))
    }
    else if(avatarPart == avatar.head || avatarPart == avatar.body) {
        returnValue = avatarPart.translateZ( -100 * delta );
    }
    

    return returnValue;
}

//Controls
var updateFcts  = [];
updateFcts.push(function(delta, now){
    /*for(i in avatar) {
        if( keyboard.pressed('left') ){
            avatar[i].rotation.y -= 1 * delta;     
        }else if( keyboard.pressed('right') ){
            avatar[i].rotation.y += 1 * delta;
        }
        if( keyboard.pressed('down') ){
            avatar[i].translateZ( 100 * delta );     
        }else if( keyboard.pressed('up') ){
            avatarMoveForward(avatar[i], delta);

            console.log(delta);
        }
    }*/

        if( keyboard.pressed('left') ){
            //avatar[i].rotation.y -= 1 * delta;     
        }else if( keyboard.pressed('right') ){
            //avatar[i].rotation.y += 1 * delta;
        }
        if( keyboard.pressed('down') ){
            //avatar[i].translateZ( 100 * delta );     
        }else if( keyboard.pressed('up') ){
            //avatarMoveForward(avatar[i], delta);
            console.log(combinedAvatar);
            combinedAvatar.translateZ(-100 * delta);
        }
});

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


updateFcts.push(function(){
    renderer.render( scene, camera );       
});
init();
render();

