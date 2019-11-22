import React from "react";
import ChangeRadioSizeButton from '../../Shared/changeSizeRadioButton';
import "./index.css"
import * as utils from "../../Shared/Util"
class SizeForm extends React.Component {

    constructor(props) {
        super();
        this.size = {
            w: 50,
            h: 201,
            d: 35
        };
        this.position = [];
    }

    getSizeValue = (e, key) => {
        this.size[key] = e.target.value;
        this.setShelf();
    }

    setShelf = () => {
        const { w, h, d } = this.size;
    };

    addShelf = () => {
        const { w, h, d } = this.size;
        utils.generateShelf(w,h,d);
    };

    render() {
        const sizes = {
            w: { sizeValues: [50, 75, 100], labelContent: "Width" },
            h: { sizeValues: [201, 236], labelContent: "Height" },
            d: { sizeValues: [35, 58], labelContent: "Depth" },
        };
        return (
            <div className="InputGroup">
                <h3>请选择您想添加柜子的长宽高:</h3>
                {
                    Object.keys(sizes).map((key) => {
                        return (
                            <ChangeRadioSizeButton key={key} sizeValues={sizes[key].sizeValues} labelContent={sizes[key].labelContent} getSizeValue={(e) => this.getSizeValue(e, key)} />);
                    })
                }
                <button onClick={this.addShelf} className='AddButton'>点击添加柜子</button>
            </div>
        )
    }

}

export default SizeForm;