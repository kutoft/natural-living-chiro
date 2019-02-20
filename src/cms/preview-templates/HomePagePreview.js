import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/home-page'

const HomePagePreview = ({ entry, widgetFor }) => (
  <HomePageTemplate
    home={entry.getIn(['data', 'home'])}
    services={entry.getIn(['data', 'services'])}
    blogs={entry.getIn(['data', 'blogs'])}
    content={widgetFor('body')}
  />
)

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default HomePagePreview
