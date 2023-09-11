import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userView } from "../../pages/api/userApi";
import LoadingPage from "../common/loadingPage";

function ViewUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const id = route.query;

  const getData = async () => {
    setLoading(true);
    try {
      const res = await userView(id.index);
      setUser(res.data.data.users);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  <b>View User</b>
                </h2>
              </div>
              <div className="col-sm-6 ms-auto">
                <Link href="/users" className="btn btn-success">
                  Back
                </Link>
              </div>
            </div>
          </div>
          {loading ? (
            <LoadingPage />
          ) : (
            <table className="mx-lg-5">
              <tbody>
                <tr>
                  <th className="py-1 px-2">First Name: </th>
                  <td className="py-1 px-2 fw-medium">{user?.first_name}</td>
                </tr>
                <tr>
                  <th className="py-1 px-2">Last Name: </th>
                  <td className="py-1 px-2 fw-medium">{user?.last_name}</td>
                </tr>
                <tr>
                  <th className="py-1 px-2">Email: </th>
                  <td className="py-1 px-2 fw-medium">{user?.email}</td>
                </tr>
                <tr>
                  <th className="py-1 px-2">Role: </th>
                  <td className="py-1 px-2 fw-medium">{user?.role}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
