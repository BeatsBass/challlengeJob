import React from 'react';
import { Link } from "react-router-dom";
import './header.css'

const header = () => {
    return (
        <header className='header'>
            <h1>JOB CHALLENGE</h1>
            <div className="link">
                <li><Link to="/dashboard">Dashboard</Link> </li>
                <li><Link to="/login">Login</Link> </li>
                <li><Link to="/register">Register</Link> </li>
            </div>
        </header>
    )
}
export default header