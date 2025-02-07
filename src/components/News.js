import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News (props) {

    const [articles, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);


    useEffect(() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
        loadArticles(url);
    }, []);

    // const componentDidMount = async() => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}&category=${props.category}`;
    //     this.loadArticles(url);
    // }

    const loadNextArticles = async() =>{
        // console.log('button next');
        // console.log(this.state.totalArticles/20);
        // console.log(this.state.page);
        if(page < Math.ceil(totalArticles/props.pageSize))
        {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=fac48e0e14164277a95e8cdd54d4f16f&page=${setPage(page + 1)}&pageSize=${props.pageSize}&category=${props.category}`;
        setLoading(true);
        setPage(page + 1);
        loadArticles(url);
        }

    }

    const loadPrevArticles = async() =>{
        //console.log('button prev');
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=fac48e0e14164277a95e8cdd54d4f16f&page=${setPage(page - 1)}&pageSize=${props.pageSize}&category=${props.category}`;
        setLoading(true);
        setPage(page - 1);
        loadArticles(url);
    }

    const loadArticles = async(url) =>{

        props.setProgress(20);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);
        //set state variables
        setArticle(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        setLoading(false);
        setPage(page + 1);
        props.setProgress(100);
    }

    const capitalizeString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchMoreData = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(articles.concat(parsedData.articles));
        setTotalArticles(parsedData.totalResults);
        setLoading(false);
            // console.log("Articles" + this.state.articles.length);
            // console.log(""+ this.state.totalArticles);
    }

    return(
        <>

            <h1 style={{margin: '35px 0px', textAlign: 'center'}}>Top {capitalizeString(props.category)} Headlines in Stone World</h1>
            {loading && <Loading />}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalArticles}
                loader={<Loading />}>
                <div className="container my-4">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title = {element.title?element.title : ""} description={element.description?element.description: ""} url ={element.urlToImage?element.urlToImage: ""} linkUrl ={element.url?element.url : ""} date={element.publishedAt} author={element.author?element.author : 'Unknown'} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        {/* <div className="container my-4 d-flex justify-content-between">
        <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.loadPrevArticles}>&larr; Previous</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalArticles/props.pageSize)}className="btn btn-dark" onClick={this.loadNextArticles}>Next &rarr;</button>
        </div> */}
        
        </>
    );

}

News.defaultProps = {
    country: 'us',
    pageSize: 8
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}

export default News;