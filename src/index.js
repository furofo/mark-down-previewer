import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
import $ from "jquery";

console.log('this is a test');

class MarkDownContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        <div>
        <div className = "center">
        <div className = "editor-container"> hello</div>
        </div>
        <div className = "center">
        <div className = "preview">world</div>
        </div>
        </div>
        );
    }

}

ReactDom.render(<MarkDownContainer />, document.getElementById('root'));