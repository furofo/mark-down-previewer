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
        <p>Hello World!</p>
        </div>
        );
    }

}

ReactDom.render(<MarkDownContainer />, document.getElementById('root'));