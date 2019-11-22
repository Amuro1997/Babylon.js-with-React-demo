import React from "react"
import { Button } from "antd"
import "./index.css"
import * as utils from "../../Shared/Util"
export default class IOPanel extends React.Component{

    importJson = () => {
        let d = document.createElement('input');
        d.type = "file";

        d.onchange = () => {
            let fr = new FileReader();
            fr.onload = async (e) => {
                const url = e.target.result;
                const res = await ((await fetch(url)).json())
                utils.generateShelfFromJson(res);
            }
            fr.readAsDataURL(d.files[0]);
        }
        d.click();
    }

    exportJson = () => {

    }

    render() {
        return (
            <div id="IOContainer">
                <button className="ioButton" onClick={()=>this.importJson()}>import</button>
                <button className="ioButton" onClick={()=>this.exportJson()}>export</button>
            </div>
        )
    }

}