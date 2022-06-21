import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../Images/logo.jpg';
import './NavigationBar.css';



const NavigationBar = ({token,path,changePath,logOut}) => {


            return (<header className='main-nav'>
            <div className='main-navigation-logo'>
                <img src={logo}/>
                </div>
                <nav className='main-nav-items'>
                    <ul>
                        <li onClick={() => changePath('events')}><Link  className={`Link ${path =='events'?'active':null}`} to='/events'>Events</Link>{path == 'events' &&<div className='selecteddiv'></div>}</li>
                         {token && <li onClick={() => changePath('bookings')}><Link className={`Link ${path =='bookings'?'active':null}`} to='/bookings'>Bookings</Link>{path == 'bookings' &&<div className='selecteddiv'></div>}</li>}
                         {!token && <li onClick={() => changePath('auth')}><Link className={`Link ${path =='auth'?'active':null}`} to='/auth'>Log in</Link>{path == 'auth' &&<div className='selecteddiv'></div>}</li>}
                        {token && <li onClick={logOut}><Link className={`Link ${path =='auth'?'active':null}`} to='/auth'>Leave</Link></li>}
                    </ul>
                </nav>  
        </header>
    )
}
 
export default NavigationBar;