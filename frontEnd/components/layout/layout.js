import Header from "../common/header";
import ProtectedRoute from "../common/protectedRoute";

function Layout({ title, children }) {
  return (
    <ProtectedRoute>
      <div className="container">
        <Header title={title} />
        {children}
      </div>
     </ProtectedRoute> 
  );
}

export default Layout;
