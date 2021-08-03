import React from 'react';
import agent from '../agent';
import Select from 'react-select'
import { connect } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { EditorState, convertToRaw } from 'draft-js';
import NumericInput from 'react-numeric-input';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class EditorProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  
    
    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }
  onEditorStateChange  = (editorState) => {
    this.setState({
      editorState,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
    console.log("-----------", this.props.isProduct);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor-page max-w-3xl mx-auto">
         <p className="text-2xl font-bold text text-center mt-4 ">Create Product</p> <br/>     
         <Divider />
         <br/> 
              <form>
              
                <TextField id="outlined-basic" label="Product Title" variant="outlined" value={this.props.title}
                      onChange={this.changeTitle} fullWidth/>
                <br/>  <br/>
                <p className="text-base">Select Community</p><br/>
                <Select options={options}/>
                  <br/>
                <p className="text-base">Write your article</p><br/>
                <div className="border">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </div>
                <br/>

            
                {/* <TextField id="outlined-basic" label="Post Title" variant="outlined" value={this.props.title}
                      onChange={this.changeTitle} />
                <TextField id="outlined-basic" label="Post Title" variant="outlined" value={this.props.title}
                      onChange={this.changeTitle} /> */}  
                    <TextField
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                      variant="outlined"
                      label="Tag" fullWidth />
                    
                    <div className="tag-list mt-4">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="border border-blue-600 p-1 m-2 mrinline-block rounded-full"  key={tag}>                             
                            {tag}  <HighlightOffIcon onClick={this.removeTagHandler(tag)} />
                            </span>
                          );
                        })
                      }
                    </div>
                    <br/>
                    <div className="w-1/4 bg-gray-100">
                    <Button 
                    //  variant="contained"
                    component="label"
                    className="w-full"
                    >
                      <p className="text-4xl text-blue-500 font-bold mb-2 text-center">+</p>
                      <input
                      type="file"
                      hidden
                    />
                    
                    </Button>
                    <p className="text-lg text-blue-800 font-bold text-center">Uploading...</p>
                    <Divider />
                    <br/>
                    <p className="text-center">(image, videos, <br/> gifts)</p>
                  </div>
                  <p className="font-bold text-lg mt-8">Fixed price - in USD</p>
                  <NumericInput step={0.01} precision={2} value={0.000} className="h-10 w-48" snap/> $
                  <br/>
                  <Button variant="contained"   
                  disabled={this.props.inProgress}
                    onClick={this.submitForm} color="primary" className="float-right"
                    >
                    Publish Product
                  </Button>
              </form>

            </div>
       
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorProduct);
