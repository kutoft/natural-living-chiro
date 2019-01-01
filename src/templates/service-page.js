import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ServicePageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="content">
            <div
              className="full-width-image-container margin-top-0"
              style={{
                backgroundImage: `url(/img/${image.relativePath})`,
              }}
            >
              <h1
                className="has-text-weight-bold is-size-1 has-background-secondary"
                style={{
                  color: 'white',
                  padding: '1rem 1.25rem',
                }}
              >
                {title}
              </h1>
            </div>
          </div>
          <div className="section">
            <PageContent className="content" content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}

ServicePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ServicePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ServicePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.thumbnail.image}
        content={post.html}
      />
    </Layout>
  )
}

ServicePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ServicePage

export const servicePageQuery = graphql`
  query ServicePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
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
`