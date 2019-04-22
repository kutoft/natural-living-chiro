import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/Layout'

export const ServicesPageTemplate = ({
  data,
}) => (
  <>
    <section className="hero is-bold is-primary">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-12-mobile">
              <h1 className="title is-size-1">
                Services
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="content">
              <h2>Take Control Of Your Health</h2>
              <p>
                Natural Living Chiropractic provides a wide ranges of services and techinques designed for the whole body. Everyday we help our patients through their rehabilitation and see the countless benefits of people taking control of their health through chiropractic care.
              </p>
              <ul className="services">
                {/* get dynamic list from graphql */}
                {data.allMarkdownRemark.edges
                .map(({ node: service }, index) => (
                  <li key={index} className="service">
                    {console.log(service)}
                    <div className="columns">
                      <div className="column is-4">
                        <Img
                          fluid={service.frontmatter.thumbnail.image.childImageSharp.fluid}
                          alt={service.frontmatter.thumbnail.alt}
                        />
                      </div>
                      <div className="column is-8">
                        <h3>{service.frontmatter.title}</h3>
                        <p>{service.frontmatter.description}</p>
                        <div className="buttons">
                          <a className="button is-small is-primary" href="https://www.schedulicity.com/scheduling/NLCQQM" target="_blank">
                            Book Appointment
                          </a>
                          <Link className="button is-small is-primary is-outlined" to="/new-patient">
                            New Patient
                          </Link>
                          <Link
                            className="button is-small is-right"
                            to={service.fields.slug}
                            style={{
                              marginLeft: 'auto'
                            }}
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
               ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

ServicesPageTemplate.propTypes = {
  data: PropTypes.object
}

const ServicesPage = ({ data }) => {
  return (
    <Layout>
      <ServicesPageTemplate
        data={data}
      />
    </Layout>
  )
}

ServicesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ServicesPage

export const servicesPageQuery = graphql`
query {
  allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "service-page" }, active: { eq: true } } }
    sort: { fields: frontmatter___order }
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          templateKey
          active
          order
          title
          description
          thumbnail {
            alt
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
}
`
