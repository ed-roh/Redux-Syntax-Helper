import React from 'react';

// code block syntax highlighter plugin import
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs/xcode';

class outputReducer extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccordion = this.handleAccordion.bind(this);
        this.state = {
            accordion: true
        }
    }

    handleAccordion() {
        this.setState((prevState) => {
            return { accordion: !prevState.accordion }
        })
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.handleAccordion} className="accordion button_layout output_accordion">
                <div className="button_name">
                    {this.props.reducerName}
                </div>
                <div className="button_icon">{this.state.accordion ? 
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,14 10,6 18,14" />
                    </svg> :
                    <svg className="arrows" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <polyline strokeLinejoin="miter" points="2,6 10,14 18,6" />
                    </svg>
                }</div>
                </button>
                {this.state.accordion ? 
                    <SyntaxHighlighter className="output_accordion" language='javascript' style={xcode}>{this.props.reducerLogic}</SyntaxHighlighter> 
                : null }
            </div>
        )
    }
}

export default outputReducer;
