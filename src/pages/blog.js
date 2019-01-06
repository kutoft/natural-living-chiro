import React from 'react'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const { group } = data.allMarkdownRemark


    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <div className="content">
                  <h1 className="has-text-weight-bold is-size-2">Latest Blog Posts</h1>
                </div>
                {posts
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
            </div>
          </div>
        </section>
        {/*
        <section>
          <ul className="taglist">
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </section>
        */}
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,

    }),
  }),
}

export const blogPageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
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
