import babylonContext from "../BabylonContext";
import Store from "./Store";
import * as babylon from "babylonjs";
import * as utils from "./Util"
import { setupDrawerAnimation, setupAccessoryBehavior } from "./Accessory_helper";

export default class Accessory {
    constructor(mesh, type) {
        this.model = mesh;
        this.type = type;
        this.parent = null;
        this.switch = false;
        setupAccessoryBehavior(this);
        this.setupAnimation();
    }

    setupAnimation = () => {
        this.model.metadata.startAnimation = false;
        if(this.type === "drawer") {
            setupDrawerAnimation(this);
        }
    }

    startupAnimation = () => {
        if(this.model.metadata.startAnimation) {
            this.model.metadata.startAnimation(this.switch);
            this.switch = !this.switch;
        }
    }

    setParent = (p) => {
        this.parent = p;
    }

    highlight = () => {
        utils.clearHighLight();
        this.model.getChildren().forEach(child=>{
            babylonContext.highlight.addMesh(child, new babylon.Color3.White);
        })
    }

    removeHighLight = () => {
        this.model.getChildren().forEach(child=>{
            babylonContext.highlight.removeMesh(child);
        })
    }

    dispose = () => {
        this.model.getChildren().forEach(child=>{
            babylonContext.scene.removeMesh(child);
        })
        babylonContext.scene.removeMesh(this.model);
    }

    changeTexture = (text) => {
        this.model.getChildren().forEach(child=> {
            child.material && (child.material.diffuseTexture = text);
        })
    }

    resize = (size) => {
        const {w=1,h=1,d=1} = this.model.metadata;
        // each accessory have different scaling rule
        if(this.type === "board") {
            this.model.getChildren()[0].scaling = new babylon.Vector3(size.w/w,1,(size.d-3)/d);
        } else if(this.type === "basket") {
            this.model.scaling = new babylon.Vector3((size.w-3)/w,1,(size.d-3)/d);
        } else if(this.type === "drawer") {
            this.model.scaling = new babylon.Vector3((size.w - 3)/w,1,(size.d - 3) / d);
        } else if(this.type === "hanger") {
            this.model.scaling = new babylon.Vector3(size.w/h,1,1);
        } else if(this.type === "innerShelf") {
            this.model.scaling = new babylon.Vector3((size.w/2)/w, size.h/2/w, (size.d-3)/ d);
        }
    }
}