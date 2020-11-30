import React from 'react'

class ImageCard extends React.Component {
    render() {
        const { src, title, alt="image" } = this.props;
        return (
            <div className="Image-card row mt-2">
                <div className="col-12 col-md-3">
                    <img src={src} alt={alt}></img>
                </div>
                <div className="col-12 col-md-9">
                    <div>{title}</div>
                </div>
            </div>
        )
    }
}
export default ImageCard