import { PrivatetRoute } from "../common/protectedRoute";

function LoginLayout({ title, children }) {
  return (
    <PrivatetRoute>
      <div className="container">
        <section className="ftco-section vh-100 d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-5">
                <div className="login-wrap p-4 p-md-5">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="fa fa-user-o" />
                  </div>
                  <h3 className="text-center mb-4 fw-bold">{title}</h3>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PrivatetRoute>
  );
}

export default LoginLayout;
