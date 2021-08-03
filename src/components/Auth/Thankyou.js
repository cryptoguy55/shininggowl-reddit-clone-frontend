import React from "react"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import underMaintenance from "../../assets/images/maintenance-2.png"
import { Link } from "react-router-dom";
class Maintenance extends React.Component {

  render() {
    return (
      <Container component="main" maxWidth="md">
          <div className="flex flex-col items-center mt-20">
              <img
                src={underMaintenance}
                alt="underMaintenance"
                className="img-fluid align-self-center mt-75"
              />
              <h1 className="text-4xl">You have registered successfully!</h1>
              <p className="px-2 my-4 text-center">
                Thank You for Registration!<br/>
                you need to activate your account. We already sent you the email for your activation.<br/>
                <span className="text-red-500">(And don’t wait too long. This link will only work for 1 hour and you can only use it once.)
                </span>
              </p>
              <Link to="/login">
              <Button variant="outlined" color="primary" >
                Back to login
              </Button>
              </Link>
          </div>
         </Container>
    )
  }
}
export default Maintenance
