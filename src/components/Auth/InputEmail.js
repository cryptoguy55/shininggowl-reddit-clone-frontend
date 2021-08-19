import React, { useState, useEffect }  from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import Container from '@material-ui/core/Container'
import logo from '../../assets/images/reset-password.png';

import agent from '../../agent'
import {
  useLocation,
  Link
} from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const submitForm = () => (ev) => {
    ev.preventDefault();
    dispatch({ type: "Verify", payload: agent.Auth.resetPassword(email) })
  }
    return (
      <Container component="main" maxWidth="md" className=" mt-20">
        
      <div className="flex flex-col items-center ">
        <img
          src={logo}
          alt="underMaintenance"
          className="img-fluid align-self-center mt-75"
        />
        <form onSubmit={submitForm() } >
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
           onChange={(e) => {setEmail(e.target.value)}} 
          />        
           <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
          RESET
          </Button>
          </form>
      </div>     
    </Container>
   )
  
}

