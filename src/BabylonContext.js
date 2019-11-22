
import * as babylon from "babylonjs"
import { Vector3 } from "babylonjs";
import * as utils from "./Shared/Util"
import * as url from "./resources/model/scene.glb"
import * as ground from "./resources/model/car.glb"
import * as obj from "./resources/model/shelf.glb"
import shelfTexture from "./resources/shelf.bmp"
import 'babylonjs-loaders';
class Context {

    setupCanvas = () => {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
    }

    setupEngine = () => {
        this.engine = new babylon.Engine(this.canvas, true, {stencil: true});
    }

    setupScene = () => {
        this.scene = new babylon.Scene(this.engine);
        this.scene.clearColor = new babylon.Color3.FromHexString("#f0f0f0");
        this.scene.ambientColor = new babylon.Color3.FromHexString("#ffffff")
        this.scene.lightsEnabled = true;
        var ground = babylon.MeshBuilder.CreateGround("ground", {width: 3000, height: 3000}, this.scene);
        const mat = new babylon.StandardMaterial("", this.scene);
        mat.diffuseColor = new babylon.Color3.FromHexString("#f0f0f0");
        ground.material = mat;
        ground.receiveShadows = true;	
    }

    setupLight = () => {
        this.ambientLight = new babylon.HemisphericLight("HemiLight", new babylon.Vector3(5, 1, 10), this.scene);
        this.ambientLight.diffuse = new babylon.Color3.FromHexString("#ffffff")
        this.ambientLight.intensity = 0.8;

        this.directionalLight = new babylon.DirectionalLight("", new babylon.Vector3(1000, -200, -1000));
        this.directionalLight.diffuse = new babylon.Color3.FromHexString("#fff3e7");
        this.directionalLight.intensity = 2;
        this.directionalLight.range = 1000;
        
        // this.spotlight = new babylon.PointLight("", new babylon.Vector3(25, 150, 50), this.scene);
        // this.spotlight.diffuse = new babylon.Color3.FromHexString("#fff3e7");
        // this.spotlight.intensity = 1;
    }

    setUpShadowGenerator = () => {
        this.shadowGenerator = new babylon.ShadowGenerator(1024, this.directionalLight);
    }

    setupRoom = () => {
        this.roomCube = babylon.MeshBuilder.CreateBox("", {
            width: 1000,
            height:1000,
            depth: 1000
        }, this.scene);
        this.roomCube.material = new babylon.StandardMaterial("", this.scene);
        this.roomCube.material.diffuseColor = new babylon().Color3.Blue;
    }

    initLittleTokyo = () => {
        babylon.SceneLoader.ImportMesh("", url.default, "", this.scene, (scene) => {
            console.log(scene)
        });

    }

    initGround = () => {
        babylon.SceneLoader.ImportMesh("", ground.default, "", this.scene, (meshes) => {
            const root = new babylon.TransformNode("", this.scene);
            meshes.forEach(mesh => {
                mesh.parent = root;
            })
            root.position.y -= 3300;
            // root.rotate(new babylon.Vector3(0,0,1), Math.PI/2);
            // root.rotate(new babylon.Vector3(-1,0,0),Math.PI/2);
            
        });
    }


    setupCamera = () => {
        let position = new Vector3(0,100,300);
        this.camera = new babylon.ArcRotateCamera("camear", Math.PI / 2, Math.PI /2, 20,position,this.scene);
        this.camera.panningAxis = new babylon.Vector3(1,0,0);
        this.camera.panningSensibility = 100;

        this.camera.attachControl(this.canvas, false);
        this.camera.target = new babylon.Vector3(0,100,0);
    }

    init = () => {
        // this.initGround();
        utils.generateShelf(50,201, 35);
        // this.initLittleTokyo();
        // babylon.SceneLoader.ImportMesh("", obj.default, "", this.scene, (scene) => {
        //     let m = scene[0];
        //     m.material = new babylon.StandardMaterial("", this.scene);
        //     // m.material.baseTexture = new babylon.Texture(shelfTexture.url, this.scene);
        // });
    }

    render = () => {
        this.engine.runRenderLoop(()=>{
            this.scene.render();
            document.getElementById("FpsCounter").innerHTML = this.engine.getFps().toFixed() + " fps"
        })
    }

    setUpEvent = () => {
        this.canvas.addEventListener("click", (e)=>{
            let pick = this.scene.pick(e.clientX, e.clientY);
            if(!pick.hit) {
                utils.clearHighLight();
            }
        })
    }

    setupHighLightLayer = () => {
        this.highlight = new babylon.HighlightLayer("",this.scene);
        this.highlight.outerGlow = false;
    }

    constructor() {
        this.setupCanvas();
        this.setupEngine();
        this.setupScene();
        this.setupCamera();
        this.setupLight();
        this.setUpShadowGenerator();
        this.setUpEvent();
        this.setupHighLightLayer();
    }
}

const babylonContext = new Context();

export default babylonContext;