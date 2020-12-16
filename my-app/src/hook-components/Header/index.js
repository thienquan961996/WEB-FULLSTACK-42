import { useEffect, useMemo, useState } from 'react';
import logo from '../../giphy-logo.svg';
import './style.css';

function Header ({ loading }) {
    // thay đổi dựa vào prop bool truyền từ App
    // loading = false, showTitle= true
    // loading= true, showTitle = false
    const showTitle = useMemo(() =>{
        return !loading;
    }, [loading]);

    // const [showTitle, setShowTitle] = useState(loading);

    // useEffect(() =>{
    //     setShowTitle(!loading);
    // }, [loading])

    return(
        <div className="Header 
            d-flex 
            flex-column 
            align-items-center 
            justify-content-center 
            mt-4"
        >
            <img src={logo} alt="logo"/>
            {showTitle && <h3>Let's search Hook</h3>}
        </div>
    )
}
export default Header