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
              <h1 className="title is-size-1">
                Natural Living Loves New Patients
              </h1>
              <h2 className="subtitle is-size-4">
                Our new patient center makes it simple and easy to learn more about how to get started with chiropractic care and a healthier life.
              </h2>
              <Link className="button is-light is-medium" to="/appointment">
               Visit New Patient Center
              </Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold is-size-1">Services</h2>
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
        <section className="section">
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold is-size-1">Blog</h2>
            </div>
            {blogs
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                  </p>
                  <p>
                    <Link className="button is-small" to={post.fields.slug}>
                      Learn More →
                    </Link>
                  </p>
                </div>
              ))}
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
      filter: { frontmatter: { templateKey: { eq: "service-page" } }}
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
        filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
              tags
            }
          }
        }
      }
  }
`
