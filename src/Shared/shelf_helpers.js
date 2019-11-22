import * as babylon from "babylonjs"
import Store from "./Store"
import * as Utils from "./Util"
import babylonContext from "../BabylonContext"
export const setupShelfBehavior = (_this) => {
    const am = new babylon.ActionManager(Utils.getScene());
    let child=_this.model.getChildren(child=>child.metadata && child.metadata.main)[0];
    child.actionManager = am;
    am.registerAction(
        new babylon.ExecuteCodeAction(
            babylon.ActionManager.OnLeftPickTrigger,
            () => {
                if(Store.selection) Store.selection.removeHighLight();
                Store.selection = _this;
                _this.highlight();
            }
        )
    );
    am.registerAction(
        new babylon.ExecuteCodeAction(
            babylon.ActionManager.OnDoublePickTrigger,
            ()=>{
                babylonContext.camera.setTarget(_this.getCenter().clone());
                babylonContext.camera.setPosition(new babylon.Vector3(_this.getCenter().x, _this.getCenter().y,8 * _this.size.d));
            }
        )
    )
}