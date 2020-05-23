import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
import $ from "jquery";
import marked from 'marked';

console.log('this is a test');

let placeholderText = `# Welcome to my React Markdown Previewer!
`;

class MarkDownContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.getElementById('preview-code').innerHTML = marked('# Welcome to my React Markdown Previewer!');
    }
    render() {
        return(
        <div>
        <div className = "center">
            <div className = "editor-container"> 
                <h1>Editor</h1>
                <textarea id = "editor" rows = "15">
                    {placeholderText}
                </textarea>
            </div>
        </div>
        <div className = "center">
            <div className = "preview" id ="preview-code"></div>
       </div>
        </div>
        );
    }

}

ReactDom.render(<MarkDownContainer />, document.getElementById('root'));