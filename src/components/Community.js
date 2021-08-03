import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

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

class EditorMain extends React.Component {
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
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor-page max-w-3xl mx-auto">
         <p className="text-2xl font-bold text text-center mt-4 ">Create Community</p> <br/>     
         <Divider />
         <br/> 
              <form>
              
                <TextField id="outlined-basic" label="Community Name" variant="outlined" value={this.props.title}
                      onChange={this.changeTitle} fullWidth/>
                <br/>  <br/>
                <TextField id="outlined-basic" label="description" variant="outlined" value={this.props.description}
                      onChange={this.changeDescription} fullWidth/>
                <br/>
               
                  <br/>
                  <Button variant="contained"   
                  disabled={this.props.inProgress}
                    onClick={this.submitForm} color="primary" className="float-right"
                    >
                    Publish Community
                  </Button>
               
               

               
              </form>

            </div>
       
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorMain);
