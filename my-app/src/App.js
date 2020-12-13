import React from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/Header'
import FormSearch from './components/FromSearch'
import ImageCard from './components/imageCard'
import Loading from './components/loading';

import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: '',
      offset: 0,
      images: [],
      hasMore: true
    }
  }

  renderImages = () => {
    return this.state.images.map((image, idx) => {
      return (
        <ImageCard
          key={idx}
          src={image.src}
          alt={image.alt}
          title={image.title}
        />
      )
    })
  }


  changeLoading = (bool) => {
    this.setState({
      loading: bool,
    });
  };

  fetchData = async (keyword, offset = 0) => {
    const urlApi =
        `
    https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi
    `
    this.setState({ loading: true});
    const res = await axios({
        url: urlApi,
        method: 'GET',
    });
    const newImages = res.data.data.map(img => {
        return {
            src: img.images.downsized.url,
            alt: img.title,
            title: img.title,
        }
    });
    const total = res.data.pagination.total_count;
    
    this.setState((oldState) => {
      const { images } = oldState;
      const newStateImages = !offset ? newImages : [...images, ...newImages] 
      const hasMore = newStateImages.length <= total;
      return { images: newStateImages, loading: false, offset, hasMore }
      
    })
}

  fetchMoreData = () =>{
    this.fetchData(this.state.keyword, this.state.offset + 25)
  }

  debounceFetch = debounce((keyword) => {
    this.fetchData(keyword);
  }, 1000)

  handleChangeKeyword = (keyword) =>{
    this.setState({ keyword });
    this.debounceFetch(keyword)
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <FormSearch
            handleChangeKeyword={this.handleChangeKeyword}
            keyword={this.state.keyword}
            submitForm={this.fetchData}
          />
          {this.state.loading && <Loading />}
          <InfiniteScroll
            dataLength={this.state.images.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={this.state.images.length ? <Loading /> : null}
            scrollThreshold="100px"
            endMessage={
              <div>
                <b>Yay! You have seen it all</b>
              </div>
            }
          >
            {this.renderImages()}
          </InfiniteScroll>
          
        </div>
      </div>

    )
  }
}


export default App

