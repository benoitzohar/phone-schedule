import React, {Component} from 'react'
import Cog from 'react-icons/lib/fa/cog'
import ArrowLeft from 'react-icons/lib/fa/arrow-left'
import {Link} from 'react-router-dom'
import './Menu.css'

class Menu extends Component {
  render() {
    const path = window.location.pathname
    return (
      <div className="Menu">
        <Link to="/" className={path === '/' ? 'hidden' : ''}>
          <ArrowLeft />
        </Link>

        <Link to="/config" className={path === '/config' ? 'hidden' : ''}>
          <Cog />
        </Link>
      </div>
    )
  }
}

export default Menu
