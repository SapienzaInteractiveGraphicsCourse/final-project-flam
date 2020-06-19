function createRoom1(gridSize) {
    // GRID
    var size = gridSize;
    //var divisions = 20;
    //var gridHelper = new THREE.GridHelper(size, divisions);
    //scene.add(gridHelper);

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/parquet.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshPhongMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWall = new THREE.TextureLoader().load('../../images/flowers.png');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(0.5, 0.5);

    const materialWall = new THREE.MeshPhongMaterial({
        map: textureWall,
        side: THREE.BackSide,
    });

    const textureWallP = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWallP.wrapS = THREE.RepeatWrapping;
    textureWallP.wrapT = THREE.RepeatWrapping;
    textureWallP.repeat.set(4, 4);

    const materialWallP = new THREE.MeshPhongMaterial({
        map: textureWallP,
    });

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.jpg');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.1, 0.1);

    const materialWallB = new THREE.MeshPhongMaterial({
        map: textureWallB,
    });

    const textureWallH = new THREE.TextureLoader().load('../../images/hallway.jpg');
    textureWallH.wrapS = THREE.RepeatWrapping;
    textureWallH.wrapT = THREE.RepeatWrapping;
    textureWallH.repeat.set(4, 4);

    const materialWallH = new THREE.MeshPhongMaterial({
        map: textureWallH,
    });

    const textureWallR = new THREE.TextureLoader().load('../../images/roof.jpg');
    textureWallR.wrapS = THREE.RepeatWrapping;
    textureWallR.wrapT = THREE.RepeatWrapping;
    textureWallR.repeat.set(0.1, 0.1);

    const materialWallR = new THREE.MeshPhongMaterial({
        map: textureWallR,
    });

    const materialRoof = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.BackSide });

    var room = new THREE.Group();

    var floor = createPlane(size, size, undefined, new THREE.Vector3(-90, 0, 0), [materialFloor]);
    room.add(floor);

    var door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall1 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, size / 2.0), undefined, [materialWall, materialWallP], [door]);
    room.add(wall1);

    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, 180, 0), [materialWall, materialWallB], []);
    room.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 7.5, 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, -size / 2.0), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    room.add(wall3);

    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, size / 2.0), new THREE.Vector3(0, 90, 0), [materialWall, materialWallB], [wall4Window]);
    room.add(wall4);

    var roof = createShape(0.0, size, size, new THREE.Vector3(-size / 2, size / 2, size / 2), new THREE.Vector3(270, 0, 0), [materialRoof, materialWallR], []);
    room.add(roof);

    scene.add(room);
    recursiveChild(room, collidableObjects);

    /* MODEL 3D */

    var mtlLoaderDoor = new THREE.MTLLoader();
    mtlLoaderDoor.setPath("../../model3D/Room1/Door/");
    mtlLoaderDoor.load('10057_wooden_door_v3_iterations-2.mtl', function (materialsDoor) {

        materialsDoor.preload();

        var objLoaderDoor = new THREE.OBJLoader();
        objLoaderDoor.setMaterials(materialsDoor);
        objLoaderDoor.setPath("../../model3D/Room1/Door/");
        objLoaderDoor.load('10057_wooden_door_v3_iterations-2.obj', function (objectDoor) {
            objectDoor.position.x = -20;
            objectDoor.position.y = 0.0;
            objectDoor.position.z = -8.5;
            objectDoor.scale.set(0.09, 0.1, 0.075);
            objectDoor.rotateX(degToRad(-90));
            objectDoor.rotateZ(degToRad(90));
            objectDoor.traverse((child) => child.castShadow = true);
            recursiveChild(objectDoor, collidableObjects);
            scene.add(objectDoor);

        });
    });

    const gltfLoaderWardrobe = new THREE.GLTFLoader();
    gltfLoaderWardrobe.load("../../model3D/Room1/Wardrobe/scene.gltf", (gltf) => {
        const root = gltf.scene;
        wardrobe = root;
        root.position.x = -9.0;
        root.position.y = 0.0;
        root.position.z = 18.0;
        root.scale.set(7, 8, 5);
        root.name = 'WARDROBE';
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);

        scene.add(root);
    });

    var mtlLoaderLamp = new THREE.MTLLoader();
    mtlLoaderLamp.setPath("../../model3D/Common/Lamp/");
    mtlLoaderLamp.load('lightbulbfinal.mtl', function (materialsLamp) {

        materialsLamp.preload();

        var objLoaderLamp = new THREE.OBJLoader();
        objLoaderLamp.setMaterials(materialsLamp);
        objLoaderLamp.setPath("../../model3D/Common/Lamp/");
        objLoaderLamp.load('lightbulbfinal.obj', function (objectLamp) {
            objectLamp.position.x = 0.0;
            objectLamp.position.y = 16.8;
            objectLamp.position.z = 0.0;
            objectLamp.scale.set(0.09, 0.02, 0.075);
            objectLamp.rotateY(degToRad(90));
            scene.add(objectLamp);

        });
    });

    var mtlLoaderBackpack = new THREE.MTLLoader();
    mtlLoaderBackpack.setPath("../../model3D/Room1/Backpack/");
    mtlLoaderBackpack.load('12305_backpack_v2_l3.mtl', function (materialBackpack) {

        materialBackpack.preload();

        var loader = new THREE.OBJLoader();
        loader.setMaterials(materialBackpack);
        loader.setPath("../../model3D/Room1/Backpack/");
        loader.load('12305_backpack_v2_l3.obj', function (object) {
            object.position.x = -5.0;
            object.position.y = 0.0;
            object.position.z = -17.0;
            object.scale.set(0.2, 0.2, 0.2);
            object.rotateX(degToRad(-90));
            object.name = "BACKPACK";

            object.traverse((child) => child.castShadow = true);
            recursiveChild(object, collidableObjects);

            var obj = new Thing(object, null, null, false, true, null, null);

            objectsAnimated.push(obj);
            objectsRaycaster.push(obj.getObject());
            scene.add(object);
        });
    });

    const gltfLoaderWindow = new THREE.GLTFLoader();
    gltfLoaderWindow.load("../../model3D/Common/Window/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 20.0;
        root.position.y = 9;
        root.position.z = 7.5;
        root.scale.set(0.087, 0.035, 0.05);
        root.rotateY(degToRad(270));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderBed = new THREE.GLTFLoader();
    gltfLoaderBed.load("../../model3D/Room1/Bed/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 11;
        root.position.y = 0;
        root.position.z = -14;
        root.scale.set(0.05, 0.04, 0.06);
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var finalPosition = 50;
        var animation = (t, move) => {
            if(root.getObjectByName('polySurface3595_M_pillow_blanket_0').position.z == finalPosition) return false;
            
            if (move) {
                root.getObjectByName('polySurface3595_M_pillow_blanket_0').position.z = interpolation(0, finalPosition, 0, 5, t);
                return true;
            }
            return false;
            
        };

        var obj = new Thing(root, animation, null, false, false, null, null);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderKey = new THREE.GLTFLoader();
    gltfLoaderKey.load("../../model3D/Room1/Key/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 16;
        root.position.y = 3.9;
        root.position.z = -13;
        root.name = "KEY";
        root.scale.set(0.006, 0.006, 0.006);
        root.rotateX(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);

        var animation = () => {
            console.log(enableConditionedAnimation);
            enableConditionedAnimation = true;
            console.log(enableConditionedAnimation);
        }

        var obj = new Thing(root, animation, null, false, true, "DOOR_ROOM2", null);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderDesk = new THREE.GLTFLoader();
    gltfLoaderDesk.load("../../model3D/Room1/Desk/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 10;
        root.position.y = 2.0;
        root.position.z = 15;
        root.scale.set(3, 3, 3);
        root.rotateY(degToRad(180));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        scene.add(root);
    });

    const gltfLoaderTorch = new THREE.GLTFLoader();
    gltfLoaderTorch.load("../../model3D/Room1/Torch/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = 16;
        root.position.y = 1.0;
        root.position.z = 5.0;
        root.scale.set(0.006, 0.006, 0.006);
        root.name = "TORCH";
        root.rotateX(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);

        var animation = () => {
            torch.intensity = 1;
            return true;
        }

        var reverseAnimation = () => {
            torch.intensity = 0;
            return true;
        }

        var obj = new Thing(root, animation, reverseAnimation, false, true, null, "BATTERY", true);

        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);
    });

    const gltfLoaderLightSwitch = new THREE.GLTFLoader();
    gltfLoaderLightSwitch.load("../../model3D/Room1/LightSwitch/scene.gltf", (gltf) => {
        const root = gltf.scene;
        root.position.x = -20.0; 
        root.position.y = 7.0;
        root.position.z = -14.0;
        root.scale.set(0.002, 0.002, 0.002);
        root.rotateY(degToRad(90));
        root.traverse((child) => child.castShadow = true);
        recursiveChild(root, collidableObjects);
        var finalPosition = 4;
        var animation = (t, move) => {
            if(wardrobe.position.x == finalPosition){
                wardrobe = null;
                return false
            };

            if (move) {
                wardrobe.position.x = interpolation(-9, finalPosition, 0, 15, t);
                return true;
            }
            return false;
        };

        var obj = new Thing(root, animation, null, false, false, null, null);
        
        steps.push(obj);
        objectsAnimated.push(obj);
        objectsRaycaster.push(obj.getObject());
        scene.add(root);    
    });

}