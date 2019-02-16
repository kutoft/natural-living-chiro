import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {

         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);

         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }
 }

 render() {
   return (

  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" title="Logo" style={{ padding: '0.5rem 0.75rem' }}>
          <img src={logo} alt="Natural Living Chiropractic" style={{ width: '210px', maxHeight: '50px' }} />
        </Link>
        {/* Hamburger menu */}
        <div className="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to="/services">
            Services
          </Link>
          <div className="navbar-dropdown">
           {/* get dynamic list from graphql */}
            <Link className="navbar-item" to="/services">
              Service 1
            </Link>
            <Link className="navbar-item" to="/services">
              Service 2
            </Link>
          </div>
        </div>
        <Link className="navbar-item" to="/new-patient">
          New Patients
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/blog">
          Blog
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary is-outlined" to="#">
              Shop
            </Link>
            <Link className="button is-primary" to="/schedule-appointment">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar