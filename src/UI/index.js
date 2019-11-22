import React from "react"
import AccessoryPanel from "./AccessoryPanel"
import TexturePanel from "./TexturePanel"
import SizeForm from "./SizePanel"
import FpsCounter from "./FpsCounter";
import AnimationPanel from "./AnimationPanel";
import IOPanel from "./IOPanel";

class UI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inEntry: true,
        };
    }

    render(){
        return (
            <div>
                <FpsCounter />
                <SizeForm />
                <TexturePanel />
                <AccessoryPanel />
                <AnimationPanel />
                <IOPanel />
            </div>
        )
    }
}

export default UI;