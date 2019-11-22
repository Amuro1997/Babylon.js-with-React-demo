import Store from "./Store"
import * as Utils from "./Util"
import { Vector3, ActionManager} from "babylonjs";
import * as babylon from "babylonjs";
import babylonContext from "../BabylonContext";
import * as _ from "lodash"
import { setupShelfBehavior } from "./shelf_helpers";

export default class Shelf {

    constructor(w, h, d) {
        this.accessory = [];
        this.texture = null;
        this.size = { w, h, d };
        this.model = Utils.generateShelfModel(w, h, d);
        this.model.metadata = {parent:this};
        this.accessory = [];
        this.open = false;
        this.doorVisable = false;
        setupShelfBehavior(this);
        this.setupDoor();
    }

    setupDoor = () => {
        const {w,h,d} = this.size;
        this.leftDoor = Utils.generateBox(w/2, h, 2);
        this.leftDoor.position.x += w/2 + w/4;
        this.leftDoor.position.z += d / 2;
        this.leftDoor.visibility = 0;
        this.leftDoor.parent = this.model;
        this.rightDoor = Utils.generateBox(w/2, h, 2);
        this.rightDoor.position.x += w/4;
        this.rightDoor.position.z += d / 2;
        this.rightDoor.visibility = 0;
        this.rightDoor.parent = this.model;
        this.leftDoor.isPickable = false;
        this.rightDoor.isPickable = false;
    }

    changeDoorVisibility = () => {
        this.leftDoor.visibility = this.doorVisable ? 0 : 1;
        this.rightDoor.visibility = this.doorVisable ? 0 : 1;
        this.doorVisable = !this.doorVisable;
    }

    openDoor = () => {
        if(!this.doorVisable) return;
        const {w,h,d} = this.size;
        let angle  = 0;
        const factor = this.open ? -1 : 1;
        this.open = !this.open;
        const id = window.setInterval(()=>{
            if(angle >= Math.PI / 3) {
                window.clearInterval(id);
            }
            this.leftDoor.rotateAround(new babylon.Vector3(w, 0, d/2), new babylon.Vector3(0,1,0), 0.1 * factor);
            this.rightDoor.rotateAround(new babylon.Vector3(0, 0, d/2), new babylon.Vector3(0,-1,0), 0.1 * factor);
            angle += 0.1;
        }, 50)
    }

    highlight = () => {
        this.model.getChildren().forEach(
            child=>babylonContext.highlight.addMesh(child, new babylon.Color3.White)
        )
    }

    removeHighLight = () => {
        this.model.getChildren().forEach(
            child=>babylonContext.highlight.removeMesh(child)
        )
    }

    getCenter = () => {
        const position = new Vector3();
        position.copyFrom(this.model.position);
        position.x += this.size.w / 2;
        return position;
    }

    changeTexture = (text) => {
        this.texture = text
        this.model.getChildren().forEach(child=>child.material.diffuseTexture=text);
        this.accessory.forEach(acc=>acc.changeTexture(text));
    }

    addAccessory = (acc) => {
        if(!this.accessory.includes(acc))this.accessory.push(acc);
    }

    removeAccessory = (acc) => {
        _.pull(this.accessory, acc);
    }

    dispose = () => {
        this.model.getChildren().forEach(child=>{
            child.dispose(true);
            babylonContext.scene.removeMesh(child);
        })
        this.accessory.forEach(acc=>{
            acc.dispose();
        })
        this.model.dispose();
        babylonContext.scene.removeMesh(this.model);
    }
}