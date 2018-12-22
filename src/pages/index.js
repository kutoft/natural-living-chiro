import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: services } = data.services
    const { edges: blogs } = data.blogs

    console.log(data)
    return (
      <Layout>
        <section className="hero is-medium is-bold is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-12-mobile is-9-tablet is-6-desktop">
                  <h1 className="title is-size-1">
                    Natural Living Loves New Patients
                  </h1>
                  <h2 className="subtitle is-size-4">
                    Our new patient center makes it simple and easy to learn more about how to get started with chiropractic care and a healthier life.
                  </h2>
                  <Link className="button is-light is-medium" to="/new-patient">
                   Visit New Patient Center
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-medium">
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold">Services</h2>
            </div>
            {services
              .map(({ node: service }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={service.id}
                >
                  <p>
                    <Link className="has-text-primary" to={service.fields.slug}>
                      {service.frontmatter.title}
                    </Link>
                  </p>
                  <p>
                    <Link className="button is-small" to={service.fields.slug}>
                      Learn More →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
        <section className="section is-medium" style={{backgroundImage: 'url(/img/jumbotron.jpg)', backgroundSize: "cover"}}>
          <div className="container">
            <div className="columns is-desktop">
              <div className="column is-8 is-offset-2">
                <div className="content has-text-centered">
                  <h3 className="has-text-white">Schedule Your Appointments Online</h3>
                  <p className="has-text-white">Now its easier than ever to schedule your appointments, just fill out our online form and you are all set.</p>
                  <Link className="button is-primary is-medium" to="/appointment">
                   Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section is-medium has-text-centered">
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold">Blog</h2>
            </div>
            <div className="columns is-variable is-3-mobile is-6-desktop" style={{alignItems: 'stretch'}}>
            {blogs
              .map(({ node: post }) => (
                <div className="column" style={{display: "flex"}}>
                  <div
                    className="content has-text-left"
                    style={{ border: '1px solid #333', padding: '2em 4em' }}
                    key={post.id}
                  >
                    <h4>
                      <Link className="has-text-primary" to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </h4>
                    <p>
                      <Link className="has-text-dark" to={post.fields.slug}>
                        {post.frontmatter.description}
                      </Link>
                    </p>
                    <p>
                      <Link className="button is-small" to={post.fields.slug}>
                        Learn More →
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
              </div>
              <Link className="button is-primary is-centered" to="/blog">
                View All Posts
              </Link>
          </div>
        </section>
        <section className="section is-medium" style={{backgroundImage: 'url(/img/products-full-width.jpg)', backgroundSize: "cover"}}>
          <div className="container">
            <div className="columns is-desktop">
              <div className="column is-8 is-offset-2">
                <div className="content has-text-centered">
                  <h3 className="has-text-white">Have A Question?</h3>
                  <p className="has-text-white">Ask us anything, at anytime. We will do our best to get back to you as soon as we can.</p>
                  <Link className="button is-primary is-medium" to="/contact">
                   Ask A Question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    services: PropTypes.shape({
      edges: PropTypes.array,
    }),
    blogs: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const homePageQuery = graphql`
  query HomePageQuery {
    services: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "service-page" } }},
      limit: 6
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    },
    blogs: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
        limit: 3
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              description
              tags
            }
          }
        }
      }
  }
`
