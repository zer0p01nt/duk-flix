import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1.5rem;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

export default function ProtectedRoute(): React.JSX.Element {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' replace />;
  }
}
