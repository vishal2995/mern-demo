import { useState } from "react";
import LoadingPage from "../components/common/loadingPage";
import LoginForm from "../components/common/form/loginForm";
import LoginLayout from "../components/layout/loginLayout";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <LoginLayout title="Login">
      {loading ? <LoadingPage /> : null}
      <LoginForm setLoading={setLoading} />
    </LoginLayout>
  );
}
