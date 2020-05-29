import React from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom'
import './style.css';
import $ from "jquery";
import marked from 'marked';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import { createStore } from 'redux';




const reducer = (state = 5) => {
    return state;
  }
  
  // Redux methods are available from a Redux object
  // For example: Redux.createStore()
  // Define the store here:
let store = createStore(reducer);

console.log('this is store state');
console.log(store.getState());


marked.setOptions({
    breaks: true
});
let placeholderText =  `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class MarkDownContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: placeholderText,
            previewSwitch: true,
            editorSwitch: true,
        }
        this.updateMessage = this.updateMessage.bind(this);
        this.previewExpand = this.previewExpand.bind(this);
        this.editorExpand = this.editorExpand.bind(this);

    }

    updateMessage(event) {
        console.log(event.target.value);
        this.setState({
            input: event.target.value
        })

        
    }

    previewExpand(){
        if(this.state.previewSwitch){
            $(".editor-container").hide("slow", function(){});
            this.setState({
                previewSwitch: false
            })
        }

        else {
            $(".editor-container").show("slow", function(){});
            this.setState({
                previewSwitch: true
            })
        }
    }
    editorExpand(){
        if(this.state.editorSwitch){
            $(".preview-container").hide("slow", function(){});
            $(".editor-container").animate({
                width: "80%",
            }, 1000);
            
            this.setState({
                editorSwitch: false
            })
            //$("#editor").attr("rows", "40");
            $("#editor").animate({
                rows: "40"
            }, 1000);
        }

        else {
            $(".preview-container").show("slow", function(){$(".editor-container").css("width", "70%");});
            $(".editor-container").animate({
                width: "70%",
            }, 1000);
            //$("#editor").attr("rows", "15");
            $("#editor").animate({
                rows: "15"
            }, 1000);
            this.setState({
                editorSwitch: true
            })
        }
    }
    componentDidMount() {
        document.getElementById('preview').innerHTML = marked(this.state.input);
        console.log("what is this");
       
        
        
        $("#preview-expander").click(this.previewExpand);
       
        $("#editor-expander").click(this.editorExpand);
       
        
        
    }

    componentDidUpdate() {
        document.getElementById('preview').innerHTML = marked(this.state.input);
    }
    render() {
        return(
        <div>
        <div className = "center">
            <div className = "editor-container">
                <div id = "editor-heading"> 
                
                <i className="fas fa-fire">  Editor</i>
              <a href ="#" id = "editor-expander">  <i className="fas fa-arrows-alt"></i> </a>
                
                </div>
            
            
                <textarea onChange = {this.updateMessage} id = "editor" rows = "15">
                    {this.state.input}
                </textarea>
            </div>
        </div>
        <div className = "preview-container">
        <div className = "center">
        <div id = "preview-header"> 
                
                <i className="fas fa-fire">  Preview</i>
                <a href = "#" id = "preview-expander"><i className="fas fa-arrows-alt"></i></a>
                
                </div>
            
        </div>
        <div className = "center">
            <div id = "preview">
            </div>
       </div>
       </div>
        </div>
        );
    }

}

class ActualMarkdown extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
       return(
 <MarkDownContainer />
       );
    }
    
}

ReactDom.render(<ActualMarkdown />, document.getElementById('root'));