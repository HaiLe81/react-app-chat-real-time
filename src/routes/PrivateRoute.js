import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "../hooks";
import { globals } from "../configs";
import { getCookie } from "../redux/cookie/cookie-service";
import { jwtDecode } from "../utils";

import {
  MainLayout,
  FullScreenLayout,
  SpinEffect,
  NotFound,
} from "../components";
import { fetchUsersSuccess } from "../redux/auth/auth-actions";

function PrivateRoute({
  layout: Layout = MainLayout,
  redirectPath = "/login",
  path,
  children,
  ...rest
}) {
  const distpatch = useDispatch();
  const router = useRouter();
  const isExistedToken = getCookie(globals.env.COOKIE_KEY);
  const store = useSelector((state) => state);
  useEffect(() => {
    if (!store.auth.isAuthorized) {
      const token = getCookie(globals.env.COOKIE_KEY);
      if (!token) return;
      const user = jwtDecode(token);
      if (!user) return;
      distpatch(fetchUsersSuccess(user, token));
    }
  }, [distpatch, store.auth.isAuthorized]);
  console.log("a", store.auth.isAuthorized);
  console.log("b", store.auth);
  if (isExistedToken && store.auth.loading) {
    return (
      <FullScreenLayout>
        <SpinEffect />
      </FullScreenLayout>
    );
  }

  if (isExistedToken) {
    return (
      <Route path={path} {...rest}>
        <Layout>{children}</Layout>
      </Route>
    );
  }
  // if (!isExistedToken && !store.auth.isAuthorized) {
  //   return (
  //     <FullScreenLayout>
  //       <NotFound
  //         status="403"
  //         title="Sorry, you are not authorized to access this page."
  //       />
  //     </FullScreenLayout>
  //   );
  // }

  const from = router.pathname;

  return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
}

export default PrivateRoute;
