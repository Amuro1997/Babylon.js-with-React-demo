import * as utils from "./Util"
import Store from "./Store";
import * as babylon from "babylonjs"
export const setupDrawerAnimation = (_this) => {
    _this.model.metadata.startAnimation = (s) => {
        let step = 0;
        const limit = 20;
        const factor = s ? -1 : 1;
        const id = window.setInterval(() => {
            if (step >= limit) {
                window.clearInterval(id);
                return;
            }
            _this.model.position.z += 1 * factor;
            step++;
        }, 10);
    }
}

export const setupAccessoryBehavior = (_this) => {
    let pb = new babylon.PointerDragBehavior({ dragPlaneNormal: new babylon.Vector3(0, 0, 1) });
    _this.model.addBehavior(pb);
    pb.onDragStartObservable.add(
        (event) => {
            _this.model.position.z = 0;
            _this.highlight();
            Store.selection = _this;
        }
    )
    
    pb.onDragEndObservable.add(
        (eventData) => {
            _this.model.position.z = 0;
            let point = eventData.dragPlanePoint;
            let currentShelf = utils.getIntersectShelf(point);
            if (currentShelf) {
                _this.model.position.x = currentShelf.getCenter().x;
                _this.model.position.z = currentShelf.getCenter().z - 2;
                _this.parent && _this.parent.removeAccessory(_this);
                _this.parent = currentShelf;
                currentShelf.addAccessory(_this);
                if(_this.type === "innerShelf") {
                    _this.model.position.x = currentShelf.model.position.x + currentShelf.size.w/4;
                }
            } else {
                _this.dispose();
            }
        }
    )
    pb.onDragObservable.add(
        (eventData) => {
            _this.model.position.z = 0;
            let point = eventData.dragPlanePoint;
            let currentShelf = utils.getIntersectShelf(point);
            if (currentShelf) _this.resize(currentShelf.size);
        }
    )
}