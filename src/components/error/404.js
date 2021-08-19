import React from "react"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import underMaintenance from "../../assets/images/404.png"
import { Link } from "react-router-dom";
class Error404 extends React.Component {

  render() {
    return (
      <Container component="main" maxWidth="md">
          <div className="flex flex-col items-center mt-20">
              <img
                src={underMaintenance}
                className="img-fluid align-self-center mt-75"
              />
              <h1 className="text-4xl">404 - Page Not Found!</h1>
              <p className="px-2 my-4 text-center">
                
              </p>
              <Link to="/">
              <Button variant="outlined" color="primary" >
                Back to Home
              </Button>
              </Link>
          </div>
         </Container>
    )
  }
}
export default Error404


