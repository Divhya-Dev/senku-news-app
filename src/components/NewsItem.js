import React,{Component} from "react";

const NewsItem = (props) =>{
   
      
        return(
            <>
            <div className="my-3">
            <span className="badge rounded-pill text-bg-dark">{props.source}</span>
            <div className="card" style={{}}>
                <img src={props.url? props.url : "https://media.cnn.com/api/v1/images/stellar/prod/3058424-2244b.jpg?c=16x9&q=w_800,c_fill"} className="card-img-top" alt="..." style={{height: "13rem"}} />
                <div className="card-body" >
                    <h5 className="card-title">{props.title?.slice(0,38)}...</h5>
                    <p className="card-text">{props.description?.slice(0,88)}...</p>
                    <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
                   
                    <a href={props.linkUrl} target="_blank" className="btn btn-light">Read More</a>
                </div>
            </div>
            </div>
            </>
        );
    
}

export default NewsItem;