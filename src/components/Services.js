import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import PropTypes from "prop-types"

const Services = ({ data }) => (
  <ul className="services">
    {/* get dynamic list from graphql */}
    {data.allMarkdownRemark.edges
    .map(({ node: service }, index) => (
      <li key={index} className="service">
        <h2>{service.frontmatter.title}</h2>
        <p>{service.frontmatter.description}</p>
      </li>
   ))}
  </ul>
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
        }
      }
    `}
    render={data => <Services data={data} {...props} />}
  />
)

Services.propTypes = {
  data: PropTypes.shape({
    services: PropTypes.shape({
      edges: PropTypes.array,
    })
  }),
}
