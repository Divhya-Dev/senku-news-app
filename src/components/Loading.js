import React,{Component} from "react";
import loader from './Loading.gif';

class Loading extends Component{
    render(){
        return(
            <>
            <div className="text-center">
            <img src={loader} />
            </div>
            </>
        )
    }
}

export default Loading;