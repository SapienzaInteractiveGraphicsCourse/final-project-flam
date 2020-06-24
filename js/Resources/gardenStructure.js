function createGarden(gridSize) {
    var size = gridSize;
    recursiveChild(house, collidableObjects);

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/garden.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhysicalMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureFence = new THREE.TextureLoader().load('../../images/fence.jpg');
    textureFence.wrapS = THREE.RepeatWrapping;
    textureFence.wrapT = THREE.RepeatWrapping;
    textureFence.repeat.set(0.0646, 0.065);

    const materialFence = new THREE.MeshPhysicalMaterial({
        map: textureFence,
        side: THREE.DoubleSide,
    });

    var garden = new THREE.Group();

    var floor = createPlane(size, size, new THREE.Vector3(-50.0, -0.01, 20.0), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    garden.add(floor);

    var wall1 = createShape(0.0, size / 25, size * 0.8, new THREE.Vector3(-size * 0.43, 0.0, 0.552 * size), undefined, [materialFence], []);
    wall1.name = "w2";
    garden.add(wall1);

    var wall2 = createShape(0.0, size / 25, size * 0.8, new THREE.Vector3(-size * 0.43, 0.0, -0.447 * size), undefined, [materialFence], []);
    wall2.name = " w3";
    garden.add(wall2);

    var wall3 = createShape(0.0, size / 25, size, new THREE.Vector3(size * 0.368, 0.0, -0.447 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    wall3.name = "w4";
    garden.add(wall3);

    var wall4 = createShape(0.0, size / 25, size / 2.26, new THREE.Vector3(-size * 0.43, 0.0, -0.447 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    wall4.name = "w1";
    garden.add(wall4);

    var wall5 = createShape(0.0, size / 25, size / 2.26, new THREE.Vector3(-size * 0.43, 0.0, 0.1105 * size), new THREE.Vector3(0, -90, 0), [materialFence], []);
    wall5.name = "w1.5";
    garden.add(wall5);

    garden.position.x = -50;
    recursiveChild(garden, collidableObjects);

    const gltfLoaderGateway = new THREE.GLTFLoader();
    gltfLoaderGateway.load("../../model3D/Garden/Gateway/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -222.5;
        root.position.y = 0.0;
        root.position.z = 20.0;
        root.scale.set(8.0, 8.0, 8.0);
        root.rotateY(degToRad(90));
        root.getObjectByName('Left_1').position.x = 2;
        root.getObjectByName('Right_0').position.x = 2;
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var animation = (t, move) => {
            if (root.getObjectByName('Right_0').position.x == -1.5) {
                openGate = true;
                return false;
            }
            if (move) {
                root.getObjectByName('Right_0').position.x = interpolation(2, -1.5, 0, 25, t);
                root.getObjectByName('Left_1').position.x = interpolation(2, 5.5, 0, 25, t);
                return true;
            }
            return false;
        };
        var obj = new Thing(root, animation, null, false, false, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));
    });;

    const gltfLoaderShovel = new THREE.GLTFLoader();
    gltfLoaderShovel.load("../../model3D/Garden/Showel/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -30.0;
        root.position.y = 5.5;
        root.position.z = -23.0;
        root.scale.set(0.09, 0.15, 0.09);
        root.rotateX(degToRad(30));
        root.rotateY(degToRad(180));
        root.name = 'SHOVEL';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = {
            root: root,
            animation: null,
            actionEnded: false,
            reverseAnimation: null,
            actionButton: "Q",
        };
        var obj = new Thing(root, null, null, false, true, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderRake = new THREE.GLTFLoader();
    gltfLoaderRake.load("../../model3D/Garden/Rake/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -80.0;
        root.position.y = 9.0;
        root.position.z = 202.0;
        root.scale.set(8, 8, 8);
        root.rotateY(degToRad(90));
        root.rotateZ(degToRad(120));
        root.name = 'RAKE';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderSet = new THREE.GLTFLoader();
    gltfLoaderSet.load("../../model3D/Garden/Set/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 45.0;
        root.position.y = 0.1;
        root.position.z = -150.0;
        root.scale.set(0.3, 0.3, 0.3);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });



    const gltfLoaderShears = new THREE.GLTFLoader();
    gltfLoaderShears.load("../../model3D/Garden/Shears/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 60.0;
        root.position.y = 6.2;
        root.position.z = 150.0;
        root.scale.set(0.05, 0.05, 0.05);
        root.rotateX(degToRad(90));
        root.name = 'SHEARS';
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderTable = new THREE.GLTFLoader();
    gltfLoaderTable.load("../../model3D/Garden/Table/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 0.0;
        root.position.y = 0.5;
        root.position.z = -50.0;
        root.scale.set(0.2, 0.2, 0.2);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderParkTable = new THREE.GLTFLoader();
    gltfLoaderParkTable.load("../../model3D/Garden/ParkTable/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 60.0;
        root.position.y = 3.0;
        root.position.z = 150.0;
        root.scale.set(5, 8, 5);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });;


    const gltfLoaderRockingChair = new THREE.GLTFLoader();
    gltfLoaderRockingChair.load("../../model3D/Garden/RockingChair/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -50.0;
        root.position.y = -0.1;
        root.position.z = 70.0;
        root.scale.set(10, 10, 10);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderMonster = new THREE.GLTFLoader();
    gltfLoaderMonster.load("../../model3D/Garden/Monster/Wolf-Blender-2.82a.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -207;
        root.position.y = 0.0;
        root.position.z = 35.0;
        root.scale.set(10, 10, 10);//40
        root.name = "MONSTER";
        root.rotateY(degToRad(180));

        legR = root.getObjectByName("Oberschenkel_R_044");  //-0.02
        legR.position.x = 0.15;
        legL = root.getObjectByName("Oberschenkel_L_041"); //-0.03
        legL.position.x = 0.15;

        armR = root.getObjectByName("Schalterplatte_R_033"); //0.08
        armR.position.x = 0.2;
        armL = root.getObjectByName("Schalterplatte_L_025"); //0.08

        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, false, null, null);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        monster = root;
        scene.add(root);
        // console.log(dumpObject(root).join('\n'));

        animate();

    });

    const gltfLoaderBench = new THREE.GLTFLoader();
    gltfLoaderBench.load("../../model3D/Garden/Bench/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -110.0;
        root.position.y = 0.0;
        root.position.z = 180.0;
        root.scale.set(0.07, 0.07, 0.07);
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderRose = new THREE.GLTFLoader();
    gltfLoaderRose.load("../../model3D/Garden/Rose/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -110.0;
        root.position.y = 4.5;
        root.position.z = 180.0;
        root.scale.set(0.1, 0.1, 0.1);
        root.rotateZ(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderGnome = new THREE.GLTFLoader();
    gltfLoaderGnome.load("../../model3D/Garden/Gnome/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -70.0;
        root.position.y = 3.0;
        root.position.z = -165.0;
        root.scale.set(0.4, 0.4, 0.4);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderKey = new THREE.GLTFLoader();
    gltfLoaderKey.load("../../model3D/Garden/Key/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 0.0;
        root.position.y = 7.5;
        root.position.z = -50.0;
        root.name = 'KEY_GARDEN';
        root.scale.set(0.35, 0.35, 0.35);
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var obj = new Thing(root, null, null, false, true, null, null);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    return garden;
}