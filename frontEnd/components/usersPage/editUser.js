import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { roleView } from "../../pages/api/roleApi";
import { editView, userView } from "../../pages/api/userApi";
import UserForm from "../common/form/form";

const EditUSer = () => {
  const router = useRouter();
  const id = router.query;
  const [validated, setValidated] = useState(false);
  const [allValues, setAllValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleError, setRoleError] = useState("");
  const [user, setUser] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await userView(id.index);
      setAllValues(res.data.data.users);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getRoleData = async () => {
    setLoading(true);
    try {
      const res = await roleView();
      setUser(res.data.data.role);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || allValues.role === "") {
      setValidated(true);
      setRoleError("Role is required");
    } else if (
      allValues.password !== allValues.confirmPassword &&
      allValues.password !== ""
    ) {
      setPasswordConfirmError("Password does not match");
    } else {
      const data = {
        first_name: allValues.first_name,
        last_name: allValues.last_name,
        email: allValues.email,
        role: allValues.role,
      };
      if (allValues.password) {
        data.password = allValues.password;
      }

      setLoading(true);
      editView(id.index, JSON.stringify(data))
        .then((res) => {
          toast.success(res.data.message);
          router.push("/users");
          setEmailError("");
          setPasswordError("");
          setPasswordConfirmError("");
          setFirstNameError("");
          setlastNameError("");
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          if (error.response?.status === 500) {
            setLoading(false);
            const errors = error.response.data.error.errors;
            setEmailError(errors?.email?.message);
            setPasswordError(errors?.password?.message);
            setPasswordConfirmError(errors?.passwordConfirm?.message);
            setFirstNameError(errors?.first_name?.message);
            setlastNameError(errors?.last_name?.message);
          }
        });
    }
  };

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
    getRoleData();
  }, [id]);

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <UserForm
              allValues={allValues}
              user={user}
              validated={validated}
              handleSubmit={(e) => handleSubmit(e)}
              changeHandler={(e) => changeHandler(e)}
              firstNameError={firstNameError}
              lastNameError={lastNameError}
              emailError={emailError}
              passwordError={passwordError}
              passwordConfirmError={passwordConfirmError}
              roleError={roleError}
              loading={loading}
              title="Edit User"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUSer;
