import React, {Component} from 'react';
import './index.css';
import Store from "../../../../Shared/Store"
import * as utils from "../../../../Shared/Util"

class AccessoryItem extends Component {
    setItemToAdd = () => {
        Store.itemToAdd = this.props.type;
        utils.generateAccessory();
    }
    render(){
        return (
        <div className="Accessory_card" >
            <img className='Accessory_img' onClick={()=>this.setItemToAdd()} src={this.props.img} alt="broken"/>
        </div>
        )
    }
}

export default AccessoryItem;
