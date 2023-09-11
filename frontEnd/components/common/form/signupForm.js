import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { administratorSignup } from "../../../pages/api/api";

function SignUpForm({ setLoading }) {
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const router = useRouter();

  const [allValues, setAllValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      setEmailError("");
    } else if (allValues.password !== allValues.confirmPassword) {
      setPasswordConfirmError("Password does not match");
    } else {
      const data = JSON.stringify({
        first_name: allValues.first_name,
        last_name: allValues.last_name,
        email: allValues.email,
        password: allValues.password,
        passwordConfirm: allValues.confirmPassword,
      });
      try {
        setLoading(true);
        const resp = await administratorSignup(data);
        toast.success(resp.data.message);
        router.push("/");
        setEmailError("");
        setPasswordError("");
        setPasswordError("");
        setPasswordConfirmError("");
        setFirstNameError("");
        setlastNameError("");
        setLoading(false);
      } catch (error) {
        if (error.response.status === 500) {
          const errors = error.response.data.error.errors;
          setEmailError(errors.email?.message);
          setPasswordError(errors.password?.message);
          setPasswordConfirmError(errors.passwordConfirm?.message);
          setFirstNameError(errors.first_name?.message);
          setlastNameError(errors.last_name?.message);
        }
      }
    }
  };
  return (
    <Form
      noValidate
      validated={validated}
      className="login-form"
      onSubmit={handleSubmit}
    >
      <Form.Group className="form-group mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          className="login-form-control rounded-left"
          placeholder="Firstname"
          required
          onChange={changeHandler}
          name="first_name"
          value={allValues.first_name || ""}
        />
        <Form.Control.Feedback type="invalid">
          <label className="login-validation-invalid-label">
            First name is required
          </label>
        </Form.Control.Feedback>
        {firstNameError ? (
          <p
            className="login-validation-invalid-label text-danger mt-1"
            id="email-error"
          >
            {firstNameError}
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="form-group mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          className="login-form-control rounded-left"
          placeholder="Lastname"
          required
          onChange={changeHandler}
          name="last_name"
          value={allValues.last_name || ""}
        />
        <Form.Control.Feedback type="invalid">
          <label className="login-validation-invalid-label">
            Last name is required
          </label>
        </Form.Control.Feedback>
        {lastNameError ? (
          <p
            className="login-validation-invalid-label text-danger mt-1"
            id="email-error"
          >
            {lastNameError}
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="form-group mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          className="login-form-control rounded-left"
          placeholder="Email"
          required
          onChange={changeHandler}
          name="email"
          value={allValues.email || ""}
        />
        <Form.Control.Feedback type="invalid">
          <label className="login-validation-invalid-label">
            Email is required
          </label>
        </Form.Control.Feedback>
        {emailError ? (
          <p
            className="login-validation-invalid-label text-danger mt-1"
            id="email-error"
          >
            {emailError}
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="form-group mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          className="login-form-control rounded-left"
          placeholder="Password"
          required
          name="password"
          onChange={changeHandler}
          value={allValues.password || ""}
        />
        <Form.Control.Feedback type="invalid">
          <label className="login-validation-invalid-label">
            Password is required
          </label>
        </Form.Control.Feedback>
        {passwordError ? (
          <p
            className="login-validation-invalid-label text-danger mt-1"
            id="email-error"
          >
            {passwordError}
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="form-group mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          className="login-form-control rounded-left"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          onChange={changeHandler}
          value={allValues.confirmPassword || ""}
        />
        <Form.Control.Feedback type="invalid">
          <label className="login-validation-invalid-label">
            Confirm password is required
          </label>
        </Form.Control.Feedback>
        {passwordConfirmError ? (
          <p
            className="login-validation-invalid-label text-danger mt-1"
            id="email-error"
          >
            {passwordConfirmError}
          </p>
        ) : null}
      </Form.Group>
      <Form.Group className="form-group">
        <button
          type="submit"
          className="form-control btn btn-primary rounded submit px-3"
        >
          signup
        </button>
      </Form.Group>
    </Form>
  );
}

export default SignUpForm;
