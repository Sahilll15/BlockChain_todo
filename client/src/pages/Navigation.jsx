import React from 'react'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
    return (
        <div>

            <NavLink to="/create">Create Task</NavLink> |
            <NavLink to="/view">View Task</NavLink> |
            <NavLink to="/">View All Task</NavLink> |
            <NavLink to='/wallet'>Wallet</NavLink>
        </div>
    )
}

export default Navigation