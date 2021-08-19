import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { Button, TextField } from '@material-ui/core';
const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug,
        { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="mt-5 px-4 border-l-4 border-red-500" onSubmit={this.createComment}>
        <TextField
          label="Commment"
          placeholder="Write a comment..."
          multiline
          variant="outlined"
          value={this.state.body}
          onChange={this.setBody} fullWidth/><br/><br/>
          <Button variant="contained" type="submit" color="primary" className="float-right">                    
              Post Comment
          </Button>
          <br/> <br/>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
