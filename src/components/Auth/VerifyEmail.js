import React, { useState, useEffect }  from "react"
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import Container from '@material-ui/core/Container'
import underMaintenance from "../../assets/images/maintenance-2.png"
import agent from '../../agent'
import {
  useLocation,
  Link
} from "react-router-dom";

export default function VerifyEmail() {
  let query = new URLSearchParams(useLocation().search);
  let  token = query.get("verify_token");
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch({ type: "Verify", payload: agent.Auth.verifyEmail(token) })
 }, []);
    return (
      <Container component="main" maxWidth="md">
          <div className="flex flex-col items-center mt-20">
              <img
                src={underMaintenance}
                alt="underMaintenance"
                className="img-fluid align-self-center mt-75"
              />
              <br/>
              <Link to="/login">
              <Button variant="outlined" color="primary" >
                Back to login
              </Button>
              </Link>
          </div>
         </Container>
    )
  
}

