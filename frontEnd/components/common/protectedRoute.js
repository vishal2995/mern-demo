import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const item = Cookies.get("loginToken");
    setAuth(item);
    if (!item) {
      router.push("/");
    }
  }, []);

  return <>{auth ? children : null}</>;
};

export default ProtectedRoute;

export const PrivatetRoute = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(" ");
  useEffect(() => {
    const item = Cookies.get("loginToken");
    setAuth(item);
    if (item) {
      router.push("/users");
    }
  }, []);
  return <>{!auth ? children : null}</>;
};
