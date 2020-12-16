import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../hook-components/Header'
import FormSearch from '../hook-components/FromSearch'
import ImageCard from '../hook-components/imageCard'
import Loading from '../hook-components/loading';

import './App.css';



function App () {

const [loading, setLoading] = useState(false);
const [keyword, setKeyword] = useState('');
const [offset, setOffset] = useState(0);
const [images, setImages] = useState([]);
const [hasMore, setHasMore] = useState(true);

// useEffect(() =>{
//     console.log('use effect');
// }, []);

const debounceFetchMemo = useMemo(() =>{
  const debounceFetch = debounce((newKeyword) => {
    fetchData(newKeyword);
  }, 1000)
  return debounceFetch;
}, []);

const cb = useCallback(() =>{
  console.log('use callback')
  return true;
}, [keyword]);

console.log('typeof cb', typeof cb)
// không chạy function mà gán function đó vào biến cb => typeof cb === 'function'

const memoVar = useMemo(() =>{
  console.log('use callback');
  return true;
}, [keyword]);

// chạy function mà gán function đó vào biến cb => typeof memoVar === ''

const renderImages = () => {
    return images.map((image, idx) => {
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

const fetchData = async (keyword, offset = 0) => {
    const urlApi =
        `
    https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${0}&rating=g&lang=vi
    `
    setLoading(true);
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
    
    const newStateImages = offset === 0 ? newImages : [...images, ...newImages] 
    
    const hasMore = newStateImages.length <= total;

    setImages(newStateImages);
    setLoading(false);
    setOffset(offset);
    setHasMore(hasMore);
}

  const fetchMoreData = () =>{
    fetchData(keyword, offset + 25)
  }

  // const debounceFetch = debounce((newKeyword) => {
  //   fetchData(newKeyword);
  // }, 1000)

  const handleChangeKeyword = (newKeyword) =>{
    setKeyword(newKeyword);
    debounceFetchMemo(newKeyword);
  }
  
  console.log('render')

    return (
      <div className="App">
        <div className="container">
            <h1>su dung hook</h1>
          <Header loading={loading}/>
          <FormSearch
            handleChangeKeyword={handleChangeKeyword}
            keyword={keyword}
            submitForm={fetchData}
          />
          {loading && <Loading />}
          <InfiniteScroll
            dataLength={images.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={images.length ? <Loading /> : null}
            scrollThreshold="100px"
            endMessage={
              <div>
                <b>Yay! You have seen it all</b>
              </div>
            }
          >
            {renderImages()}
          </InfiniteScroll>
          
        </div>
      </div>

    )
  
}


export default App

