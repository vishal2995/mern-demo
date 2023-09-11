import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { administratorLogin } from "../../../pages/api/api";
import Cookies from "js-cookie";

function LoginForm({ setLoading }) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [allValues, setAllValues] = useState({
    email: "",
    password: "",
  });
  const route = useRouter();

  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\].,;:\s@\"]+)*)|(\\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      setErrors("");
    } else if (regex.test(allValues.email) === false) {
      setErrors("Enter Valid Email");
    } else {
      const data = JSON.stringify({
        email: allValues.email,
        password: allValues.password,
      });

      try {
        setLoading(true);
        const resp = await administratorLogin(data);
        const day = resp?.data?.tokenexpires * 1;
        Cookies.set("loginToken", resp?.data?.token, { expires: day || 10 });
        Cookies.set("loginId", resp?.data?.data.user._id, {
          expires: day || 10,
        });
        setLoading(false);
        route.push("/users");
        toast.success(resp?.data.message);
        setEmailError("");
      } catch (error) {
        console.log("error", error);
        if (error.response?.status === 401) {
          setLoading(false);
          toast.error(error.response?.data.message);
        } else if (error.response?.status === 400) {
          setLoading(false);
          setEmailError(error.response?.data.message.email);
          setPasswordError(error.response?.data.message.password);
        }
      }
    }
  };

  return (
    <Form
      acceptCharset="utf-8"
      id="login-form"
      noValidate="novalidate"
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-4">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          className="login-form-control rounded-left"
          placeholder="Enter Email"
          required
          id="email"
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
      <Form.Group className="mb-4">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          className="login-form-control rounded-left"
          id="password"
          placeholder="Enter Password"
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
      {errors ? (
        <p
          className="login-validation-invalid-label text-danger"
          id="email-error"
        >
          {errors}
        </p>
      ) : null}
      <Form.Group className="mb-3">
        <button
          type="submit"
          className="login-form-control btn btn-primary rounded submit px-3 mt-3 w-100"
        >
          Login
        </button>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
