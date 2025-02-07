import React, {Component} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
    articles = [];
    static defaultProps = {
        country: 'us',
        pageSize: 8
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(){
        super();
       this.state = {
        articles: this.articles,
        loading: true,
        page: 1,
        totalArticles: 0
       }
    };

    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.loadArticles(url);
    }

    loadNextArticles = async() =>{
        // console.log('button next');
        // console.log(this.state.totalArticles/20);
        // console.log(this.state.page);
        if(this.state.page < Math.ceil(this.state.totalArticles/this.props.pageSize))
        {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fac48e0e14164277a95e8cdd54d4f16f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({loading: true, page: this.state.page + 1});
        this.loadArticles(url);
        }

    }

    loadPrevArticles = async() =>{
        //console.log('button prev');
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=fac48e0e14164277a95e8cdd54d4f16f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({loading: true, page: this.state.page - 1});
        this.loadArticles(url);
    }

    loadArticles = async(url) =>{
        this.props.setProgress(20);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(50);
            this.setState({
                articles: parsedData.articles,
                totalArticles: parsedData.totalResults,
                loading: false,
                page: this.state.page + 1
            
            })
            this.props.setProgress(100);
    }

    capitalizeString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchMoreData = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({page: this.state.page + 1});
        let data = await fetch(url);
        let parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalArticles: parsedData.totalResults,
                loading: false
            
            })
            console.log("Articles" + this.state.articles.length);
            console.log(""+ this.state.totalArticles);
    }

render() {
    return(
        <>

            <h1 style={{margin: '35px 0px', textAlign: 'center'}}>Top {this.capitalizeString(this.props.category)} Headlines in Stone World</h1>
            {this.state.loading && <Loading />}
            
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalArticles}
                loader={<Loading />}>
                <div className="container my-4">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title = {element.title?element.title : ""} description={element.description?element.description: ""} url ={element.urlToImage?element.urlToImage: ""} linkUrl ={element.url?element.url : ""} date={element.publishedAt} author={element.author?element.author : 'Unknown'} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        {/* <div className="container my-4 d-flex justify-content-between">
        <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.loadPrevArticles}>&larr; Previous</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalArticles/this.props.pageSize)}className="btn btn-dark" onClick={this.loadNextArticles}>Next &rarr;</button>
        </div> */}
        
        </>
    );
}
}

export default News;