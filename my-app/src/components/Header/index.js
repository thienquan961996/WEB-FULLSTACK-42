import React from 'react';
import logo from '../../giphy-logo.svg';
import './style.css';

class Header extends React.Component{
    render() {
        return(
            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
            <img src={logo} alt="logo"/>
            <h3>Let's search</h3>
            </div>
        )
    }
}
export default Header