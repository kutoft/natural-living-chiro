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
                    <Link className="blog-post has-text-dark" key={post.id} to={post.fields.slug} style={{display: "block", marginBottom: "3rem"}}>
                    <div className="columns">
                      <div className="column" style={{zIndex: "1"}}>
                        <div className="content">
                          <small className="tag is-primary has-text-secondary" style={{borderRadius: "0"}}>{post.frontmatter.date}</small>
                          <h2 className="has-text-primary has-background-white blog-title" style={{padding: "1rem", marginTop: "0", marginBottom: "1rem"}}>
                            {post.frontmatter.title}
                          </h2>
                          <p>
                            {post.excerpt}
                          </p>
                          <p className="tags">
                            {post.frontmatter.tags.map((tag, index) => (
                              <span key={index} style={{display: "inline-block", marginRight: "5px"}}>
                                <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                                  {tag}
                                </Link>
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <figure className="image">
                          <img alt={post.frontmatter.thumbnail.alt} src={"/img/"+post.frontmatter.thumbnail.image.relativePath} />
                        </figure>
                      </div>
                    </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
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
              }
            }
            tags
          }
        }
      }
    }
  }
`
