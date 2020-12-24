import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AuthLayout from '../components/Layout/AuthLayout';

function Signup() {
  return (
    <AuthLayout>
      <div className="Signup">
        <Form className="form-wrapper">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="confirmFormBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
        <div className="redirect-box mt-4 form-wrapper">
          <div>Have account? <Link to="/login">Login</Link></div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Signup;