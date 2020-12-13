import logo from '../../giphy-logo.svg';
import './style.css';

function Header () {
    return(
        <div className="Header 
            d-flex 
            flex-column 
            align-items-center 
            justify-content-center 
            mt-4"
        >
            <img src={logo} alt="logo"/>
            <h3>Let's search</h3>
        </div>
    )
}
export default Header