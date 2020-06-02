function createRoom2(gridSize) {

    // GRID
    var size = gridSize;
    var divisions = 20;
    var gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.z = 40;
    scene.add(gridHelper);

    // MATERIALS
    const textureFloor = new THREE.TextureLoader().load('../../images/parquet.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(4, 4);

    const materialFloor = new THREE.MeshBasicMaterial({
        map: textureFloor,
        side: THREE.DoubleSide,
    });

    const textureWall = new THREE.TextureLoader().load('../../images/wall.jpg');
    textureWall.wrapS = THREE.RepeatWrapping;
    textureWall.wrapT = THREE.RepeatWrapping;
    textureWall.repeat.set(4, 4);

    const materialWall = new THREE.MeshBasicMaterial({
        map: textureWall,
        side: THREE.BackSide,
    });

    const textureWallB = new THREE.TextureLoader().load('../../images/brick.png');
    textureWallB.wrapS = THREE.RepeatWrapping;
    textureWallB.wrapT = THREE.RepeatWrapping;
    textureWallB.repeat.set(0.3, 0.3);

    const materialWallB = new THREE.MeshBasicMaterial({
        map: textureWallB,
    });

    const textureWallH = new THREE.TextureLoader().load('../../images/hallway.jpg');
    textureWallH.wrapS = THREE.RepeatWrapping;
    textureWallH.wrapT = THREE.RepeatWrapping;
    textureWallH.repeat.set(4, 4);

    const materialWallH = new THREE.MeshBasicMaterial({
        map: textureWallH,
    });


    const materialRoof = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });

    var floor = createPlane(size, size, new THREE.Vector3(0.0, 0.0, size), new THREE.Vector3(-90, 0, 0), [materialFloor]);
    scene.add(floor);

    var wall2 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, 1.5 * size), undefined, [materialWall, materialWallB], []);
    scene.add(wall2);

    var wall3Door = createHole(8.0, 15.0, 25.0 , 0.0);
    var wall3 = createShape(0.0, size / 2, size, new THREE.Vector3(-size / 2.0, 0.0, 0.5 * size), new THREE.Vector3(0, -90, 0), [materialWall, materialWallH], [wall3Door]);
    scene.add(wall3);

    var wall4Window = createHole(10.0, 7.0, 7.5, 9.0);
    var wall4 = createShape(0.0, size / 2, size, new THREE.Vector3(size / 2.0, 0.0, 1.5 * size), new THREE.Vector3(0, 90, 0), [materialWall, materialWallB], [wall4Window]);
    scene.add(wall4);

    var roof = createShape(0.0, size, size, new THREE.Vector3(-size / 2, size / 2, 1.5 * size), new THREE.Vector3(-90, 0, 0), [materialRoof, materialWallB], []);
    scene.add(roof);
}