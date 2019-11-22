import React from "react"
import { Button } from "antd/lib/radio"
import "./index.css"
import * as utils from "../../Shared/Util"

class AnimationPanel extends React.Component {
    
    fireDrawerAnimation = () => {
        utils.startDrawerAnimation();
    }

    fireDoorAnimation = () => {
        utils.startDoorAnimation();
    }

    changeDoorVisibility = () => {
        utils.changeDoorVisibility();
    }


    render() {
        return (
            <div id="animations">
                <Button size="large" onClick={()=>this.fireDrawerAnimation()}>橱柜动画</Button>
                <Button size="large" onClick={()=>this.changeDoorVisibility()}>显示橱门</Button>
                <Button size="large" onClick={()=>this.fireDoorAnimation()}>橱门动画</Button>
            </div>
        )
    }
}

export default AnimationPanel;