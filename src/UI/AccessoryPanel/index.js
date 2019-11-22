import React from "react"
import "./index.css"
import AccessoryItem from "./components/AccessoryItem";
import Button from 'antd/es/button';
import Store from "../../Shared/Store";
import babylonContext from "../../BabylonContext";
import { Tabs } from 'antd';

const boardImg = "https://mobileimages.lowes.com/product/converted/053608/053608611772.jpg";
const drawerImg = "https://cn.bing.com/th?id=OIP.XGqSZKNIaulNxxSZsaGdEgHaHa&pid=Api&rs=1";
const dividerImg = "https://images.homedepot-static.com/productImages/43da9268-47c7-4a5e-ba16-6664ba5ffdfd/svn/white-rubbermaid-wire-closet-drawers-fg3j0503wht-64_1000.jpg"
const hangerImg = "https://res.cloudinary.com/outdoor/image/upload/c_fill,f_auto,h_718,q_auto:eco/owh/products/EECO011.jpg"
const innerShelf = "https://images.containerstore.com/catalogimages/323089/10072158-VARIO-STACKING-CUBE-RUSTIC-.jpg?width=1200&height=1200&align=center"
const ACCESSORIES = [
    { img: boardImg, type: 'board' },
    { img: drawerImg, type: 'drawer' },
    { img: dividerImg, type: 'basket' },
    { img: hangerImg, type: 'hanger' },
    { img: innerShelf, type: 'innerShelf' }
]

class AccessoryPanel extends React.Component {

    constructor() {
        super();
        this.state = { minimized: false }
    }

    cancelSelection = () => {
        Store.selection && Store.selection.removeHighLight();
        Store.selection = null;
    }

    removeItem = () => {
        Store.selection && Store.selection.dispose();
        Store.selection = null;
    }

    render() {
        const { minimized } = this.state;
        const { TabPane } = Tabs;
        return (
            <>
                <Button
                    className={minimized ? "Accessory_button_minimize" : "Accessory_button"}
                    shape="circle"
                    size="large"
                    onClick={() => this.setState({ minimized: !this.state.minimized })}
                >></Button>
                {minimized ? null :
                    <div className={minimized ? "AccessoryPanel_minimized" : "AccessoryPanel"}>
                        {/* <h1>配件</h1><br /> */}
                        <Tabs defaultActiveKey="1" size='large'>
                        <TabPane tab="推荐" key="1">
                            Recommandation
                        </TabPane>
                            <TabPane tab="配件" key="2">
                                <div className='Item_Container'>
                                    {ACCESSORIES.map((item) => <AccessoryItem img={item.img} type={item.type} />)}
                                </div>
                                <button className='selection_cancel' onClick={() => this.cancelSelection()}>取消选中配件</button>
                                <button className='remove_accessory' onClick={() => this.removeItem()}>
                                    删除选中配件
                                </button>
                            </TabPane>
                        </Tabs>

                    </div>}

            </>
        )
    }
}

export default AccessoryPanel;
