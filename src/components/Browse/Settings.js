import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED
} from '../../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>

        <fieldset className="form-group  mb-3 flex items-end">
          <img src={`http://localhost:8080/api/public/${this.state.image}`} alt={this.state.username} className="rounded-full" width="100"/>
          <input
              className="form-control"
              type="file"
              onChange={this.updateState('image')} />
          </fieldset>
        <fieldset>

          <fieldset className="form-group mb-3">
          <TextField id="outlined-basic" label="Name" variant="outlined" value={this.state.username}
              onChange={this.updateState('username')} fullWidth/>
           
          </fieldset>
          
        

          <fieldset className="form-group  mb-3">
          <TextField id="outlined-basic" label="Bio" variant="outlined"value={this.state.bio}
              onChange={this.updateState('bio')} multiline fullWidth  rows="4"/>           
          </fieldset>

          <fieldset className="form-group  mb-3">
          <TextField id="outlined-basic" label="Email" variant="outlined" value={this.state.email}
              onChange={this.updateState('email')}   fullWidth  />      
           
          </fieldset>

          <fieldset className="form-group  mb-3">
          <TextField  type="password" id="outlined-basic" label="New Password" variant="outlined"  value={this.state.password}
              onChange={this.updateState('password')}   fullWidth  />      
           
          </fieldset>
          <p className="text-right  mb-3">
          <Button variant="contained"   
                    type="submit"
                    disabled={this.state.inProgress}  color="primary"
                      >
                    Update Settings
          </Button>
          </p>
         

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <p className="text-2xl font-bold text text-center mt-4 ">My Profile</p> <br/>     
         <hr />
         <br/> 
              

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />
           </div>
         
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
