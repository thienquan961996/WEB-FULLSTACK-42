import React from 'react';
import Header from './components/Header'
import FormSearch from './components/FromSearch'
import ImageCard from './components/imageCard'
import Loading from './components/loading';

import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      images: []
    }
  }

  changeDataImages = (data) =>{
    console.log(data)
    this.setState({
      images: data
    })
  }
  changeLoading = (bool) =>{
    this.setState({
      loading: bool,
    });
  };


  render() {
    return (
      <div className ="App">
        <div className="container">
          <Header/>
          <FormSearch
          changeDataImages={this.changeDataImages}
          changeLoading={this.changeLoading}
          />
          {this.state.loading && <Loading/>}
          {this.state.images.map((image, idx) =>{
            return(
              <ImageCard
              key={idx}
              src={image.src}
              alt={image.alt}
              title={image.title}
              />
            )
          })}
        </div>
      </div>
      
    )
  }
}


export default App