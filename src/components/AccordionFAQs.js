import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'

const AccordionFAQs = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      class: "card-content"
    };
  }

  handleAccordion = (id, e) => {
    e.preventDefault();
    if(this.state.open) {
      this.setState({
        open: false,
        class: "card-content"
      });
    } else {
      this.setState({
        open: true,
        class: "card-content open"
      });
    }
  };

  componentDidMount() {

  }

 render() {
   return (
     <div className={this.state.open ? "card open" : "card"} key={this.props.index} style={{marginBottom: "20px"}} onClick={this.handleAccordion.bind(this, this.props.index)}>
       <header className="card-header has-background-secondary">
         <div className="card-header-icon" aria-label="more options" style={{display: "flex", alignItems: "center", width: "100%", padding: "0"}}>
           <span className="icon has-text-white" style={{padding: "0 10px 0 20px"}}>
             <FontAwesomeIcon icon={faPlus} />
           </span>
           <h4 className="card-header-title has-text-white is-size-6 is-marginless" >
             {this.props.data.question}
           </h4>
         </div>
       </header>
       <div className="card-content" id={this.props.data.id}>
         <div className="content">
           <p>
             {this.props.data.answer}
           </p>
         </div>
       </div>
     </div>
  )}
}

export default AccordionFAQs
