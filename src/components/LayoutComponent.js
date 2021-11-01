import React, { Component } from "react";


class MySelectLayout extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    };
    render(){
        return(
            <div className ="col-12 mt-2">
                {/* <select className="text-center" name="selectLayout" id="selectLayout" onChange={(event)=>{selectedLayout()}}>
                    <option value="2">Hiển thị 2 cột</option>
                    <option value="3">Hiển thị 3 cột</option>
                    <option value="6">Hiển thị 6 cột</option>
                </select> */}
            </div>
        );
    }
}

export default MySelectLayout;