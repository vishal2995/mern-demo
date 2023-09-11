import Link from "next/link";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Buttons from "../../common/button";
import LoadingPage from "../../common/loadingPage";

function UserForm({
  allValues,
  user,
  validated,
  handleSubmit,
  changeHandler,
  firstNameError,
  lastNameError,
  emailError,
  passwordError,
  passwordConfirmError,
  loading,
  title,
}) {
  const router = useRouter();

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              <b>{title}</b>
            </h2>
          </div>
          <div className="col-sm-6 ms-auto">
            <Link href="/users" className="btn btn-success">
              Back
            </Link>
          </div>
        </div>
      </div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="py-4 px-lg-5"
      >
        {loading ? <LoadingPage /> : null}
        <Form.Group className="form-group mb-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            className="input"
            type="text"
            required
            onChange={changeHandler}
            name="first_name"
            value={allValues.first_name || ""}
          />
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
              First name is required
            </label>
          </Form.Control.Feedback>
          {firstNameError ? (
            <p
              className="validation-invalid-label text-danger mt-1"
              id="email-error"
            >
              {firstNameError}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            className="input"
            type="text"
            required
            onChange={changeHandler}
            name="last_name"
            value={allValues.last_name || ""}
          />
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
              Last name is required
            </label>
          </Form.Control.Feedback>
          {lastNameError ? (
            <p
              className="validation-invalid-label text-danger mt-1"
              id="email-error"
            >
              {lastNameError}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="input"
            type="text"
            required
            onChange={changeHandler}
            name="email"
            value={allValues.email || ""}
          />
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
              Email is required
            </label>
          </Form.Control.Feedback>
          {emailError ? (
            <p
              className="validation-invalid-label text-danger mt-1"
              id="email-error"
            >
              {emailError}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input"
            type="password"
            required={router.pathname === "/users/add" ? true : false}
            name="password"
            onChange={changeHandler}
            value={allValues.password || ""}
          />
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
              Password is required
            </label>
          </Form.Control.Feedback>
          {passwordError ? (
            <p
              className="validation-invalid-label text-danger mt-1"
              id="email-error"
            >
              {passwordError}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="form-group mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className="input"
            type="password"
            required={router.pathname === "/users/add" ? true : false}
            name="confirmPassword"
            onChange={changeHandler}
            value={allValues.confirmPassword || ""}
          />
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
              Confirm password is required
            </label>
          </Form.Control.Feedback>
          {passwordConfirmError ? (
            <p
              className="validation-invalid-label text-danger mt-1"
              id="email-error"
            >
              {passwordConfirmError}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Role</Form.Label>
          <Form.Select
            required
            name="role"
            value={allValues.role || ""}
            onChange={changeHandler}
            placeholder="Select Role"
          >
            <option value="">Select Role</option>
            {user?.map((item, index) => {
              return (
                <option key={index} value={item.role}>
                  {item.role}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            <label className="validation-invalid-label">
            Role is required
            </label>
          </Form.Control.Feedback>
        </Form.Group>
        <div className="form-group mt-2">
          <Buttons />
        </div>
      </Form>
    </>
  );
}

export default UserForm;
