import React from "react"
import "./index.css"
import * as Utils from "../../Shared/Util"
const TexturePanel = () => {
    const changeTexture = (i) => {
        Utils.changeShelfTexture(i);
    }
    const title = ["白色", "白色木纹", "黑褐色", "白蜡木纹"];
    return (
        <div className="TexturePanel">
            {
                title.map((color, index)=> {
                    return (
                        <div className="card" onClick={()=>changeTexture(index)}>
                            <h3 className="title">{color}</h3>
                        </div>
                    )
                })
            }
            <main>
            </main>
        </div>
    )
}

export default TexturePanel;