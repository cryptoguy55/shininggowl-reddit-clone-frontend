import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap"
import lsImg from "../../../assets/img/pages/lock-screen.png"
import { User, Lock } from "react-feather"
import { history } from "../../../history"
import "../../../assets/scss/pages/authentication.scss"

class LockScreen extends React.Component {
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-5 w-100"
              >
                <img src={lsImg} alt="lsImg" className="px-5 mx-5" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-1 pb-2 w-100 lg-mx-5">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Your Session is locked</h4>
                    </CardTitle>
                  </CardHeader>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input type="text" placeholder="Username" required />
                        <div className="form-control-position">
                          <User size={15} />
                        </div>
                        <Label>Username</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group position-relative has-icon-left">
                        <Input
                          type="password"
                          placeholder="Password"
                          required
                        />
                        <div className="form-control-position">
                          <Lock size={15} />
                        </div>
                        <Label>Password</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <span
                          className="text-primary"
                          onClick={() => history.push("/pages/login")}
                        >
                          Are you not John Doe ?
                        </span>
                        <div>
                          <Button.Ripple
                            className="unlock-btn"
                            color="primary"
                            onClick={() => history.push("/")}
                          >
                            Unlock
                          </Button.Ripple>
                        </div>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default LockScreen
