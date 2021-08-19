import React from 'react';
import agent from '../../agent';
import Select from 'react-select'
import { connect } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { v4 as uuidv4 } from 'uuid';
import {
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
} from '../../constants/actionTypes';
const options = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]
const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),  
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),

});

class EditorMain extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "", community: "", tag: "", tagList: [], file: "" 
    }
      this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.setState((state) => {
          // Important: read `state` instead of `this.state` when updating.
          return {tagList: state.tagList.concat([state.tag])  }
        });
        this.setState({tag: ""})
      }
    };

    this.removeTagHandler = tag => () => {      
      this.setState((state) => {
        // Important: read `state` instead of `this.state` when updating.
        return {tagList: state.tagList.filter(item => item !== tag)}
      });
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const formData = new FormData();
      const filename = uuidv4() + "-" + this.state.file.name
      formData.append('title', this.state.title)
      formData.append('community', this.state.community)
      formData.append('body', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
      formData.append('tagList', this.state.tagList)
      formData.append( 'image' , this.state.file, filename)

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(formData, slug)) :
        agent.Articles.create(formData);

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
         <p className="text-2xl font-bold text text-center mt-4 ">Create Post</p> <br/>     
         <Divider />
         <br/> 
              <form>
              
                <TextField id="outlined-basic" label="Post Title" variant="outlined" value={this.state.title}
                      onChange={e => this.setState({title: e.target.value})} fullWidth/>
                <br/>  <br/>
                <p className="text-base">Select Community</p><br/>
                <Select options={options} onChange={e => this.setState({community: e.value})}/>
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
                      value={this.state.tag}
                      onChange={e => this.setState({tag: e.target.value})}
                      onKeyUp={this.watchForEnter}
                      variant="outlined"
                      label="Tag" fullWidth />
                    
                    <div className="tag-list mt-4">
                      {
                        (this.state.tagList || []).map(tag => {
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
                    <input type="file" onChange={e => this.setState({file: e.target.files[0]})} required/>
                  </div>
                  <br/>
                  <div className="text-right">
                    <Button variant="contained"   
                    disabled={this.props.inProgress}
                      onClick={this.submitForm} color="primary"
                      >
                      Publish Post
                    </Button>
                  </div>
              </form>

            </div>
       
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorMain);
