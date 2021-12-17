import React from 'react';
import {Link} from 'react-router-dom'; 
import logo from '../../assets/img/a.jpg';


const Header = () => {
    return (
        <div className="header fixed flex">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="location rel">
                <div className="icon-search ico">
                    <input className="label s15 font" placeholder="Your Location" />
                    <button className="icon-chevron-down arrow" />
                </div>
            </div>

            <div className="search flex aic">
                <input type="text" className="query" placeholder="Search" />
                <button className="icon-search" />
            </div>

            <div className="actions flex aic">
                <Link to="/account/signin" className="fontb s15">signin</Link>
                <button className="" >
                    <div className="icon-plus" />
                    <h2 className="s15 font">Sell</h2>
                </button>
            </div>


        </div>
    )
}

export default Header
