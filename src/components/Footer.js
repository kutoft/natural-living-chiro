import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-white.svg'

const Footer = class extends React.Component {
  constructor(props) {
    super(props);
    this.hours = [
      {
        "day": {
          "name": "Monday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Tuesday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Wednesday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Thursday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Friday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Saturday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      },
      {
        "day": {
          "name": "Sunday",
          "open": "9:00 AM",
          "close": "5:00 PM"
        }
      }
    ];
  }

  componentDidMount() {

  }

 render() {
   return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-narrow">
            <img src={logo} alt="Natural Living Chiropractic" style={{ width: '210px', maxHeight: '50px' }} />
          </div>
          <div className="column">
          </div>
          <div className="column is-narrow">
            <div className="content">
              <h3>Hours</h3>
              <ul style={{margin: "0"}}>
                {this.hours.map(({day:day}, index) => (
                  <li key={index} style={{paddingLeft: "0", listStyleType: "none"}}>
                    <span className="hour-day" style={{display: "inline-block", width: "100px"}}>{day.name}</span>
                    <span className="tag">
                      <span className="hour-open">{day.open}</span>
                      <span style={{padding: "0 0.5rem"}}>-</span>
                      <span className="hour-close">{day.close}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )}
}

export default Footer
