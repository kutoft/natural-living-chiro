import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import PropTypes from "prop-types"
import logo from '../img/logo.svg'

const Navbar = ({ data }) => (
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
           {data.allMarkdownRemark.edges
           .map(({ node: service }, index) => (
             <Link className="navbar-item" key={index} to={service.fields.slug}>
               {service.frontmatter.title}
             </Link>
           ))}
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
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "service-page" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                title
              }
            }
          }
        }
      }
    `}
    render={data => <Navbar data={data} {...props} />}
  />
)

Navbar.propTypes = {
  data: PropTypes.shape({
    services: PropTypes.shape({
      edges: PropTypes.array,
    })
  }),
}
