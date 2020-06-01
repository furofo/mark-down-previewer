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

//global variables

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

//redux logic

const reducer =  function (state = {input: placeholderText, previewSwitch: true, editorSwitch: true,}, action)  {
    if(action.type == "message"){
        return {
            input: action.input,
            previewSwitch: state.previewSwitch,  // simple logic here if type is message change message and return everything else unchanged
            editorSwitch: state.editorSwitch,
        }
    }
    else if (action.type == "previewToggle") {
        return {
            input: state.input,
            previewSwitch: !state.previewSwitch,
            editorSwitch: state.editorSwitch, // these two just siwtch boolean value for either previe or editor switch which changes the menu sizes
        }
    }
    else if (action.type == "editorToggle") {
        return {
            input: state.input,
            previewSwitch: state.previewSwitch,
            editorSwitch: !state.editorSwitch,
        }
    }
    else {
    return state;
    }
  }
let store = createStore(reducer);

//these are action creators
const loginAction = function (message) {
    return {
      type: 'message',
      input: message,
    }
  };
  const previewToggle = () => {
    return {
      type: 'previewToggle',
     
    }
  };
  const editorToggle = () => {
    return {
      type: 'editorToggle',
    }
  };
    
//mark up special flags to pass optional test
marked.setOptions({
    breaks: true
});
class MarkDownContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateMessage = this.updateMessage.bind(this); // this binds this XD so these refer to mark down conatier rather than window object
        this.previewExpand = this.previewExpand.bind(this);
        this.editorExpand = this.editorExpand.bind(this);

    }
    updateMessage(event) {
        this.props.loginAction(event.target.value) // uses props it gets from Redux that represent redux state which are defined in my react-redux section
    }

    previewExpand(){ // logic for hiding and expanding editor and preview
        if(this.props.previewSwitch){
            $(".editor-container").hide("slow", function(){});
            this.props.previewToggle();
        }
        else {
            $(".editor-container").show("slow", function(){});
            this.props.previewToggle();
        }
    }
    editorExpand(){
        if(this.props.editorSwitch){
            $(".preview-container").hide("slow", function(){});
            $(".editor-container").animate({
                width: "80%",
            }, 1000);
            this.props.editorToggle();
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
            this.props.editorToggle();
        }
    }
    componentDidMount() { // this is called after render so makes sure everything is loaded before this is run do this way so i can wait for props to load since it reads props 
        document.getElementById('preview').innerHTML = marked(this.props.input); // and otherwise would cause errors
        $("#preview-expander").click(this.previewExpand);
        $("#editor-expander").click(this.editorExpand); 
    }

    componentDidUpdate() {
        document.getElementById('preview').innerHTML = marked(this.props.input); // anytime document updates this gets called so constantly changes input based on this
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
                    {this.props.input}
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
//React Redux where I use both of these together

const mapStateToProps = (state) => { // this maps my redux state to props that react can use directly so use these props in react to get redux state
    return {
      input: state.input,
      previewSwitch: state.previewSwitch,
      editorSwitch: state.editorSwitch,
    }
  };

const mapDispatchToProps = (dispatch) => { // since dispatch actions can change redux state this likewise gives props to react but this time for these dispatch actions
return {                                    // using these lets me change redux state
    loginAction: (message) => {
        dispatch(loginAction(message));
    },
    previewToggle: () => {
        dispatch(previewToggle());
    },
    editorToggle: () => {
        dispatch(editorToggle());
    }
}
}
const Container = connect(mapStateToProps,mapDispatchToProps)(MarkDownContainer)
class ActualMarkdown extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
       return(
           <Provider store = {store}>
               <Container />
           </Provider>
       );
    }
}
ReactDom.render(<ActualMarkdown />, document.getElementById('root'));