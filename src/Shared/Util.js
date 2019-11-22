import babylonContext from "../BabylonContext"
import * as babylon from "babylonjs"
import Store from "./Store"
import Shelf from "./Shelf";
import * as white from "../resources/white.png";
import * as hazel from "../resources/hazel.jpeg"
import * as brown from "../resources/brown.jpg";
import * as whitewood from "../resources/whitewood.jpg";
import Accessory from "./Accessory";

export function getScene() {
    return babylonContext.scene;
}

export function getCamera() {
    return babylonContext.camera;
}

export function generateBox(w,h,d) {
    const box = babylon.MeshBuilder.CreateBox("", {width: w, height:h, depth:d});
    let material = new babylon.StandardMaterial("",babylonContext.scene);
    material.roughness = 0.8;
    // let pbrMaterial = new babylon.PBRMetallicRoughnessMaterial("", babylonContext.scene);
    // pbrMaterial.diffuseColor = babylon.Color3.white;
    // pbrMaterial.metallic = 1;
    // pbrMaterial.roughness = 0;
    // box.material = pbrMaterial;
    box.material = material;
    // material.useLogarithmicDepth = true;
    // material.forceDepthWrite = true;
    addToShadowList(box);
    return box;
}

export function addToShadowList(mesh) {
    babylonContext.shadowGenerator.getShadowMap().renderList.push(mesh);
}

export function generateShelfModel(w,h,d) {
    const rootNode = new babylon.TransformNode("");
    const thickness = 2;
    const leftPanel = generateBox(thickness, h,d);
    leftPanel.parent = rootNode;
    const rightPanel = generateBox(thickness,h,d);
    rightPanel.position.x += w;
    rightPanel.parent = rootNode;
    const backPanel = generateBox(w, h, thickness);
    backPanel.position.z -= d/2;
    backPanel.position.x += w / 2;
    backPanel.parent = rootNode;
    const upperPanel = generateBox(w,thickness, d);
    upperPanel.position.y = h/2;
    upperPanel.position.x += w/2;
    upperPanel.parent = rootNode;
    const bottomPanel = generateBox(w,thickness, d);
    bottomPanel.position.y -= h/2;
    bottomPanel.position.x += w/2;
    bottomPanel.parent = rootNode;
    backPanel.metadata = {main: true}
    return rootNode;
}

export function generateShelf(w,h,d) {
    let newShelf = new Shelf(w, h, d);
    const {shelfs} = Store;
    if (shelfs.length === 0) {
        shelfs.push(newShelf);
        newShelf.model.position.y += h / 2;
    } else {
        let last = shelfs[shelfs.length - 1];
        newShelf.model.position.addInPlace(last.model.position)
        newShelf.model.position.addInPlace(new babylon.Vector3(last.size.w + 2, 0, 0));
        shelfs.push(newShelf);
    }
    newShelf.model.position.y = h /2;
    Store.selection = newShelf;
    changeShelfTexture(0);
    Store.selection = null;
    let width = 0;
    shelfs.forEach(shelf=> width += shelf.size.w);
    babylonContext.camera.setPosition(new babylon.Vector3(width/2,h/2,10*d));
    babylonContext.camera.setTarget(new babylon.Vector3(width/2, h/2, 0));
    return newShelf;
}

export function getIntersectShelf(point) {
    let shelfs = Store.shelfs;
    let currentShelf = null;
    shelfs.forEach(shelf=>{
        let center = shelf.getCenter();
        let w = shelf.size.w;
        if(point.x >= center.x - w/2 && point.x <= center.x + w/2) 
            currentShelf = shelf; 
    })
    return currentShelf;
}

export function generateBasket(w,h,d) {
    const height = 20;
    const width = 2;
    let leftPanel = generateBox(width, height, d);
    leftPanel.position.x = (- w / 2 + 5);
    let rightPanel = generateBox(width, height, d);
    rightPanel.position.x = (w / 2 - 5);
    let bottomPanel = generateBox(w - 10, 2, d);
    bottomPanel.position.y = (-height / 2);
    let upLeftPanel = generateBox(7, 2, d);
    upLeftPanel.position.y = (height / 2);
    upLeftPanel.position.x = (- w / 2 + 5);
    let rightUpPanel = generateBox(5, 2, d);
    rightUpPanel.position.y = (height / 2);
    rightUpPanel.position.x = (w / 2 - 5);

    let rootNode = new babylon.TransformNode("", babylonContext.scene);
    leftPanel.parent = rootNode;
    rightPanel.parent = rootNode;
    bottomPanel.parent = rootNode;
    upLeftPanel.parent = rootNode;
    rightPanel.parent = rootNode;
    rightUpPanel.parent = rootNode;
    rootNode.metadata = {
        w,h:height,d
    }
    return rootNode;
}

export function generateBoard(w,h,d) {
    let mesh = generateBox(w,h,d);
    let rootNode = new babylon.TransformNode("", babylonContext.scene);
    mesh.parent = rootNode;
    rootNode.metadata = {
        w,h,d
    }
    return rootNode;
}

export function generateDrawer(w,h,d) {
    //create some space
    d -= 3;
    let drawerUp = generateBox(w,h,d);
    let drawerDown = generateBox(w,h,d);
    let frontFace = generateBox(w,20,2);
    let hinge = babylon.MeshBuilder.CreateSphere("",{diameter: 3});
    frontFace.position.z += d/2;
    frontFace.position.y -= 10;
    drawerDown.position.y -= 20;
    hinge.position.y -= 10;
    hinge.position.z += d / 2;


    let rootNode = new babylon.TransformNode("", babylonContext.scene);
    drawerUp.parent = rootNode;
    drawerDown.parent = rootNode;
    frontFace.parent = rootNode;
    hinge.parent = rootNode;
    rootNode.metadata = {
        w,h,d
    }
    return rootNode;
}

export function generateHanger(h) {
    let mesh = babylon.MeshBuilder.CreateCylinder("", {diameter:2,height: h});
    let rootNode = new babylon.TransformNode("", babylonContext.scene);
    mesh.parent = rootNode;
    mesh.rotate(new babylon.Vector3(0,0,1), Math.PI/2);
    rootNode.metadata = {w:1,h,d:1}
    return rootNode;
}

export function generateInnerShelf() {
    const upperPanel = generateBox(50, 2, 35);
    const leftPanel = generateBox(2, 50, 35);
    leftPanel.position.x += 50 / 2;
    upperPanel.position.y += 50 / 2;
    let rootNode = new babylon.TransformNode("", getScene());
    upperPanel.parent = rootNode;
    leftPanel.parent = rootNode;
    rootNode.metadata = {
        w: 50,
        h: 50,
        d: 35
    }
    return rootNode;
}

export function getModel(accessory) {
    let mesh = null;
    if (accessory === "board") {
        mesh = generateBoard(50, 2, 35);
    } else if (accessory === "drawer") {
        mesh = generateDrawer(50, 2, 35);
    } else if (accessory === "basket") {
        mesh = generateBasket(50, 102, 35);
    } else if (accessory === "innerShelf"){
        mesh = generateInnerShelf();
    } else if (accessory === "hanger") {
        mesh = generateHanger(50);
    }
    return mesh;
}

export function generateAccessory(w,h,d) {
    let accessory = Store.itemToAdd;
    let mesh = getModel(accessory);
    if(!mesh) return;
    const cameraPos = getCamera().position;
    mesh.position.x = cameraPos.x;
    mesh.position.y = cameraPos.y;
    mesh.position.z = cameraPos.z - 200;
    Store.selection && Store.selection.removeHighLight();
    Store.selection = new Accessory(mesh, accessory);
    changeShelfTexture(0);
}

const colorMap = [
    white.default,
    brown.default,
    hazel.default,
    whitewood.default
];
export function changeShelfTexture(i) {
    const texture = new babylon.Texture(colorMap[i]);
    console.log(texture);
    if(Store.selection) {
        Store.selection.changeTexture(texture);
    } else {
        Store.shelfs.forEach(shelf=>shelf.changeTexture(texture));
    }
}

export function clearHighLight() {
    Store.selection && Store.selection.removeHighLight();
    Store.selection = null;
}

export function setCameraPoitionAndTarget(pos, target=null) {
    babylonContext.camera.setPosition(pos.clone());
    if(target) babylonContext.camera.setTarget(target);
}

export function centerCamera() {
    const last = Store.shelfs[Store.shelfs.length-1];
    const pos = last.getCenter().clone();
    // pos.x += last.size.w / 2;
    pos.z += 10 * last.size.d;
    getCamera().setPosition(pos.clone());
    getCamera().setTarget(last.getCenter().clone());
}

export function startDrawerAnimation() {
    const shelfs = Store.shelfs;
    shelfs.forEach(shelf=>{
        shelf.accessory.forEach(acc=>{
            acc.startupAnimation();
        })
    })
}

export function startDoorAnimation() {
    const shelfs = Store.shelfs;
    shelfs.forEach(shelf=>shelf.openDoor())
}

export function changeDoorVisibility() {
    Store.shelfs.forEach(shelf=> shelf.changeDoorVisibility());
}

export function generateShelfFromJson(json) {
    Store.shelfs.forEach(shelf=>shelf.dispose());
    Store.shelfs = [];
    const {wardrobes} = json;
    wardrobes.forEach(shelf=>{
        const {width, height, depth, accessories} = shelf;
        const new_shelf = generateShelf(width, height, depth);
        accessories.forEach(accessory=>{
            const model = getModel(accessory.type);
            const toAdd = new Accessory(model, accessory.type);
            new_shelf.addAccessory(toAdd);
            toAdd.model.position.x = new_shelf.getCenter().x;
            toAdd.model.position.z = new_shelf.getCenter().z - 2;
            toAdd.model.position.y = accessory.position + 10;
            toAdd.resize(new_shelf.size);
            toAdd.changeTexture(new_shelf.texture);
        })
    })
}

export function exportShelves(){
    
}