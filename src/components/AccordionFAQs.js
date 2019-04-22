import React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'

const AccordionFAQs = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      class: "card-content",
      bgClass: "",
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
    if ((this.props.index + 1) % 3 === 1) {
      this.setState({
        bgClass: 'has-background-secondary'
      })
    } else if ((this.props.index + 1) % 3 === 2) {
      this.setState({
        bgClass: 'has-background-primary'
      })
    } else {
      this.setState({
        bgClass: 'has-background-primary-light'
      })
    }
  }

 render() {
   return (
     <div className={this.state.open ? "card open" : "card"} key={this.props.index} style={{marginBottom: "20px"}} onClick={this.handleAccordion.bind(this, this.props.index)}>

       <header className="card-header">
         <div className="card-header-icon" aria-label="more options" style={{display: "flex", alignItems: "center", width: "100%", padding: "0"}}>
           <span className="icon" style={{padding: "0 10px 0 20px"}}>
             <FontAwesomeIcon icon={faPlus} />
           </span>
           <h4 className="card-header-title is-size-6 is-marginless" >
             {this.props.data.question}
           </h4>
         </div>
       </header>
       <div className={'card-border ' + this.state.bgClass}></div>
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
