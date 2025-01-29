import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  protectionNeeded: boolean;
  children: ReactElement;
}

const RouteProtection = ({ protectionNeeded, children }: Props) => {
  // const isAuthenticated =

  // if (protectionNeeded && !isAuthenticated) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return children;
};

export default RouteProtection;
