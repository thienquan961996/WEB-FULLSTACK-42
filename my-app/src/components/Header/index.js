import React from 'react';
import logo from '../../giphy-logo.svg';
import './style.css';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTitle: true
        }
    }

    componentDidMount() {
        console.log('didmount', this.props.bool)
        if(this.props.bool === true) {
            this.setState({ showTitle: false });
        }
    }

    componentDidUpdate() {
        console.log('didUpdate', this.props.bool)
        if(this.props.bool === true && this.state.showTitle) {
            this.setState({ showTitle: false });
        }
    }

    render() {
        return(
            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <img src={logo} alt="logo"/>
            {this.state.showTitle && <h3>Let's search</h3>}
            </div>
        )
    }
}
export default Header