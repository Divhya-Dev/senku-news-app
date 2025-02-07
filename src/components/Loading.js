import React,{Component} from "react";
import loader from './Loading.gif';

const Loading = () => {

        return(
            <>
            <div className="text-center">
            <img src={loader} />
            </div>
            </>
        )
    
}

export default Loading;