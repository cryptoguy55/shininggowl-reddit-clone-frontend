import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import logo from '../../assets/images/newlogo.png';
import agent from '../../agent';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (formData) => {
    const payload = agent.Auth.register(formData);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    }
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      const formData = new FormData();
    
      // Update the formData object
      // formData.append(
      //   "myFile", this.state.file
      // );
      const filename = uuidv4() + "-" + this.state.file.name
      console.log(filename)
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      formData.append( 'image' , this.state.file, filename)
      console.log(formData)
      this.props.onSubmit(formData);
    }
  }
  
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
  return (
    <Container component="main" maxWidth="xs" className="border-black rounded border mt-20">
      <div className="flex flex-col items-center mt-10">
      <img src={logo} width="120" height="auto" alt="logo" />
        <form  onSubmit={this.submitForm(username, email, password)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="User Name"
                autoFocus
                onChange={this.changeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                onChange={this.changeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.changePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file"  onChange={(e) => this.setState({file: e.target.files[0]})}/>
            </Grid>
          </Grid><br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <p className="text-center my-4">
      copyright @ website.com 2021.7.5
      </p>
    </Container>
  );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
