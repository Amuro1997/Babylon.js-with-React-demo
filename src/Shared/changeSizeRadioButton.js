import React from 'react';
import { Radio } from 'antd';

function En2Chinese(en){
    const map = {
        Width: '宽度',
        Height: '高度',
        Depth: '深度',
    }
    return map[en];
}
const ChangeSizeRadioButton = (props) => {
    const {sizeValues, labelContent, getSizeValue} = props;
    const label = En2Chinese(labelContent);
        return (
            <div className="changeSizeValue">
             <label className="size_label">{label}:</label>
             <Radio.Group onChange={getSizeValue} defaultValue={sizeValues[0]} className="buttonGroup" size="large">
                    {
                       sizeValues.map((sizeValue) => {
                            return <Radio.Button value={sizeValue}>{sizeValue}</Radio.Button>
                       })
                     }
             </Radio.Group>
            </div>
        )
}
export default ChangeSizeRadioButton;
