import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import Loading from '../components/Loading';

function ProtectedRoute({ children }) {
//  CHILDREN REFERS TO IMMEDIATE SUB COMPONENT(SharedLayout) 
  const { user, userLoading } = useAppContext();
  // IF NO USER IS LOGGED IN - REDIRECT TO THE LANDING PAGE
  if(userLoading){
    return (
      <Loading />
    )
  }
  if(!user) {
    return <Navigate to="/landing" />
  }
  return (
    children
  )
}
export default ProtectedRoute;