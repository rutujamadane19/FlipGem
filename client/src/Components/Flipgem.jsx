import React,  { useEffect } from 'react';
import NavBar from './Home/NarBar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import './Flipgem.css';
import Dashboard from './DashboardHtml/Dashboard';
const Flipgem = () => {
    return (
        <>
            {/* <NavBar /> */}
            {/* <div className='container'>
                <div className="box">
                    <div className="header">FlipGem Balance 🪙 0</div>
                    <div className="activity">💱 View Coin Activity <ArrowRightIcon /></div>
                </div>
            </div> */}
            <Dashboard/>
        </>
    )
}

export default Flipgem;