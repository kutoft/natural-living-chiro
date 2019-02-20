import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import PropTypes from "prop-types"

const Services = ({ data }) => (
  <div className="navbar-dropdown">
   {/* get dynamic list from graphql */}
   {data.allMarkdownRemark.edges
   .map(({ node: service }, index) => (
     <Link className="navbar-item" key={index} to={service.fields.slug}>
       {service.frontmatter.title}
     </Link>
   ))}
  </div>
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
