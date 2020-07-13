import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "antd/dist/antd.css";
import { BrowserRouter, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./index";
import { FullScreenLayout, MainLayout } from "../components";
import { LoginPage } from '../containers'
import RegisterAccount from "../containers/RegisterAccount/RegisterAccount";

function Routes() {
  useEffect(() => {
    document.title = "HL";
  }, []);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PublicRoute path="/login" layout={FullScreenLayout}>
              <LoginPage />
            </PublicRoute>
            <PublicRoute path="/register" layout={FullScreenLayout}>
              <RegisterAccount />
            </PublicRoute>
            <PrivateRoute exact path="/" layout={MainLayout}>
            </PrivateRoute>
            <PrivateRoute exact path="/channel/:channelId" layout={MainLayout}>
            </PrivateRoute>
            <PublicRoute layout={FullScreenLayout}>page not found</PublicRoute>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default Routes;
