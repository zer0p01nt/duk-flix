import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute(): React.JSX.Element {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' replace />;
  }
}
