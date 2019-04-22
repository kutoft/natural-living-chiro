import React from "react";
import { navigate } from "gatsby-link";
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="hero is-bold is-primary">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-12-mobile is-9-tablet is-6-desktop">
                  <h1 className="title is-size-1">
                    Contact
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
                  <h2 className="is-size-2">Reach Out.</h2>
                  <p>We love hearing from both new and existing panients with any questions you may have. We promise to get back to you in a timely maner.</p>
                </div>
                <div className="content">
                  <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"name"} >Full Name</label>
                      <div className="control">
                        <input className="input" type={"text"} name={"name"} onChange={this.handleChange} id={"name"} required={true} />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"email"}>Email Address</label>
                        <div className="control">
                          <input className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} required={true} />
                        </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={"message"}>Message or Question</label>
                      <div className="control">
                        <textarea className="textarea" name={"message"} onChange={this.handleChange} id={"message"} required={true} />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary is-medium" type="submit">Send</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
