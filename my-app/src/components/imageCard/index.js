import React from 'react'
import ProgressiveImage from 'react-progressive-image';
import Loading from '../loading';



class ImageCard extends React.Component {
    renderPlaceholder = () =>{
        return (
            <div style={{
                height: 300,
                backgroundColor: '#cecece'
            }}>
                <Loading />
            </div>
        )
    }
    render() {
        const { src, title, alt="image" } = this.props;
        return (
            <div className="Image-card row mt-2">
                <div className="col-12 col-md-3">
                <ProgressiveImage delay={1000} src={src}>
                
                {(src, loading) => {
                    return loading ? this.renderPlaceholder() : <img src={src} alt={alt} />
                }}
                </ProgressiveImage>
                    
                </div>
                <div className="col-12 col-md-9">
                    <div>{title}</div>
                </div>
            </div>
        )
    }
}
export default ImageCard