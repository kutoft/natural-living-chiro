import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import AccordionFAQs from '../components/AccordionFAQs'

export const ServicePageTemplate = ({ title, image, description, content, contentComponent, faqs }) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <section className="hero is-bold is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-12-mobile">
                <h1 className="title is-size-1">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="full-width-image-container margin-top-0 margin-bottom-0"
        style={{
          backgroundImage: `url(/img/${image.relativePath})`,
        }}
      >
      </div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <div className="section">
                <p>{description}</p>
              </div>
              <div className="section">
                <PageContent className="content" content={content} />
              </div>
              <div className="section">
                <div className="content">
                  <h2>Frequestly Asked Questions</h2>
                  {faqs
                  .map((faq, index) => (
                    <AccordionFAQs key={index} index={index} data={faq}></AccordionFAQs>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ServicePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  faqs: PropTypes.array,
}

const ServicePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ServicePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.thumbnail.image}
        description={post.frontmatter.description}
        content={post.html}
        faqs={post.frontmatter.faqs}
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
        description
        thumbnail {
          alt
          image {
            id
            relativePath
          }
        }
        faqs {
          question
          answer
        }
      }
    }
  }
`
