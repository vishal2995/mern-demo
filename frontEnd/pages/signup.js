import { useState } from "react";
import LoadingPage from "../components/common/loadingPage";
import LoginLayout from "../components/layout/loginLayout";
import SignUpForm from "../components/common/form/signupForm";

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? <LoadingPage /> : null}
      <LoginLayout title="Sign Up">
        <SignUpForm setLoading={setLoading} />
      </LoginLayout>
    </>
  );
}
