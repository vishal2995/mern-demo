import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roleView } from "../../pages/api/roleApi";
import { addUser } from "../../pages/api/userApi";
import UserForm from "../common/form/form";

function AddUser() {
  const [validated, setValidated] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [allValues, setAllValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

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
        role: allValues.role,
      });
      setLoading(true);
      addUser(data)
        .then((res) => {
          toast.success(res.data.message);
          router.push("/users");
          setRoleError("");
          setEmailError("");
          setPasswordError("");
          setPasswordError("");
          setPasswordConfirmError("");
          setFirstNameError("");
          setlastNameError("");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
          if (error.response?.status === 500) {
            setLoading(false);
            const errors = error.response.data.error?.errors;
            setEmailError(errors?.email?.message);
            setPasswordError(errors?.password?.message);
            setPasswordConfirmError(errors?.passwordConfirm?.message);
            setFirstNameError(errors?.first_name?.message);
            setlastNameError(errors?.last_name?.message);
          } else if (error.response?.status === 429) {
            setLoading(false);
            toast.error(error.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    getRoleData();
  }, []);

  return (
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
            title="Add User"
          />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
