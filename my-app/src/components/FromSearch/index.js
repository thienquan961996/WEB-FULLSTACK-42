import React from 'react'
import { debounce } from 'lodash';
import axios from 'axios';


class FormSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyword: 'web'
        }
    }

fetchData = async (keyword) =>{
    const urlApi = 
        `
        https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi
        `
        this.props.changeLoading(true);
        const res = await axios({
            url: urlApi,
            method: 'GET',
        });
        console.log(res.data)
        this.props.changeLoading(false);
        const newImages = res.data.data.map(img =>{
            return {
                src: img.images.downsized.url,
                alt: img.title,
                title:img.title,
            }
        });
        this.props.changeDataImages(newImages)
}
    
    handleClick = async (event) =>{
        const { keyword } = this.state;
        this.fetchData(keyword)
        
    }

    debounceFetch = debounce(() =>{
        this.fetchData(this.state.keyword);
    }, 1000)

    handleChange = (event) =>{
        this.setState(
            {
            keyword: event.target.value,
            change: true
            },
            this.debounceFetch
        )
    }
    render() {
        return(
        <div className="d-flex">
            <input 
            value={this.state.keyword}
            onChange={this.handleChange}
            className="form-control" />
            <button className="btn btn-primary ml-2" 
                onClick={this.handleClick}>
                Tìm</button>
        </div>    
        )
    }
}
export default FormSearch