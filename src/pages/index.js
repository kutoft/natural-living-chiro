import React from 'react'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import AccordionService from '../components/AccordionService'

export default class IndexPage extends React.Component {

  render() {
    const { data } = this.props
    const { edges: home } = data.home
    const { edges: services } = data.services
    const { edges: blogs } = data.blogs

    console.log(home[0].node.frontmatter.sections.section)
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
            <div className="columns is-variable is-6-desktop">
              <div className="column is-half">
                <figure className="image">
                  <img src="/img/coffee-gear.png" alt="coffee" />
                </figure>
              </div>
              <div className="column is-half">
                <div className="content">
                  <h2 className="">Services At Natural Living?</h2>
                  <p className="">We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients.</p>
                  {services
                  .map(({ node: service }, index) => (
                    <AccordionService key={index} data={service}></AccordionService>
                  ))}
                  <Link className="button is-primary is-medium" to="/services">
                   See All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*
        <section className="section is-medium">
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold">Services</h2>
            </div>
            <div className="columns is-variable is-3-mobile is-6-desktop" style={{alignItems: 'stretch'}}>
            {services
              .map(({ node: service }) => (
                <div className="column is-one-quarter" style={{display: "flex"}} key={service.id}>
                  <div
                    className="content"
                    style={{ border: '1px solid #333' }}
                  >
                    <div className="image is-5by3">
                      <img alt={service.frontmatter.thumbnail.alt} src={"/img/"+service.frontmatter.thumbnail.image.relativePath} />
                    </div>
                    <div className="" style={{ padding: '1em 2em' }}>
                      <h4>
                        <Link className="has-text-primary" to={service.fields.slug}>
                          {service.frontmatter.title}
                        </Link>
                      </h4>
                      <p>
                        <Link className="has-text-dark" to={service.fields.slug}>
                          {service.frontmatter.description}
                        </Link>
                      </p>
                      <p>
                        <Link className="button is-small" to={service.fields.slug}>
                          Learn More →
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Link className="button is-primary is-medium" to="/services">
               See All Services
              </Link>
              </div>
          </div>
        </section>
        */}

        <section className="section is-medium has-bg has-bg-covered has-bg-center" style={{backgroundImage: 'url(/img/spa-home-blue-bg.jpg)'}}>
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
        <section>
          <div className="columns is-gapless">
          {home[0].node.frontmatter.sections
            .map(section => (
            <div className={'column is-one-third has-background-' + section.backgroundColor}>
              <div className="content has-text-centered" style={{padding: "4rem 2rem"}}>
                <h3 className="has-text-white">{section.heading}</h3>
                <p className="has-text-white">{section.description}</p>
                <Link className="button is-primary is-outlined is-inverted" to={section.link.destination}>
                 {section.link.text}
                </Link>
              </div>
            </div>
            ))}
          </div>
        </section>
        <section className="section is-medium">
          <div className="container">
            <div className="content has-text-centered">
              <h2 className="has-text-weight-bold">Blog</h2>
            </div>
            <div className="columns is-variable is-3-mobile is-6-desktop" style={{alignItems: 'stretch'}}>
            {blogs
              .map(({ node: post }) => (
                <div className="column blog-post" key={post.id} style={{display: "block", marginBottom: "3rem"}}>
                  <div className="columns is-mobile">
                    <div className="column" style={{zIndex: "1"}}>
                      <div className="content">
                        <Link to={post.fields.slug}>
                          <small className="date tag is-primary has-text-secondary" style={{borderRadius: "0"}}>{post.frontmatter.date}</small>
                          <h2 className="has-background-white blog-title" style={{padding: "1rem", marginTop: "0", marginBottom: "1rem"}}>
                            {post.frontmatter.title}
                          </h2>
                          <p className="description has-text-dark">
                            {post.excerpt}
                          </p>
                        </Link>
                        <ul className="taglist">
                          {post.frontmatter.tags.map((tag, index) => (
                            <li key={index}>
                              <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                                {tag}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="column">
                      <Link to={post.fields.slug}>
                      <figure className="image">
                        <img alt={post.frontmatter.thumbnail.alt} src={"/img/"+
                          !!post.frontmatter.thumbnail.image.childImageSharp
                            ? post.frontmatter.thumbnail.image.childImageSharp.fluid.src
                            : post.frontmatter.thumbnail.image.relativePath} />
                      </figure>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              <div className="has-text-centered">
                <Link className="button is-primary is-centered" to="/blog">
                  View All Posts
                </Link>
              </div>
          </div>
        </section>
        <section className="section is-medium has-bg has-bg-covered has-bg-center" style={{backgroundImage: 'url(/img/products-full-width.jpg)'}}>
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
    home: PropTypes.shape({
      hero: PropTypes.object,
      services: PropTypes.object,
      appointments: PropTypes.object,
      sections: PropTypes.object,
      support: PropTypes.object,
      about: PropTypes.object,
    }),
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
    home: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "home-page" } }}
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              hero {
                heading
                description
                link {
                  text
                  destination
                }
              }
              services {
                heading
                description
                thumbnail {
                  alt
                  image {
                    id
                  }
                }
              }
              appointments {
                heading
                description
                link {
                  text
                  destination
                }
                apps {
                  alt
                  image {
                    id
                  }
                }
              }
              sections {
                heading
                description
                backgroundColor
                link {
                  text
                  destination
                }
              }
              support {
                heading
                description
                link {
                  text
                  destination
                }
              }
              about {
                heading
                description
                thumbnail {
                  alt
                  image {
                    id
                  }
                }
              }
            }
          }
        }
      },
    services: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "service-page" }, active: { eq: true } }},
      sort: { fields: frontmatter___order },
      limit: 4
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
            description
            thumbnail {
              alt
              image {
                id
                relativePath
              }
            }
          }
        }
      }
    },
    blogs: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
      limit: 2
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
            thumbnail {
              alt
              image {
                id
                relativePath
                childImageSharp {
                  fluid(maxWidth: 526, quality: 92) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`
