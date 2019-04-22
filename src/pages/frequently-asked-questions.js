import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import AccordionFAQs from '../components/AccordionFAQs'

export default class FAQPage extends React.Component {

  render() {
    const { data } = this.props

    console.log(data)
    return (
      <Layout>
        <section className="hero is-bold is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-12-mobile">
                  <h1 className="title is-size-1">
                    Frequently Asked Questions
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
                  <div className="faqs">
                    {/* get dynamic list from graphql */}
                    {data.allMarkdownRemark.edges
                    .map(({ node: service }, index) => (
                      service.frontmatter.faqs
                      .map((faq, index) => (
                        <AccordionFAQs key={index} index={index} data={faq}></AccordionFAQs>
                     ))
                   ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

FAQPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  })
}

export const faqPageQuery = graphql`
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
            faqs {
              question
              answer
            }
          }
        }
      }
    }
  }
`
