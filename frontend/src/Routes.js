import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Places from "./containers/Places/Places";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPlace from "./containers/NewPlace/NewPlace";
import PlacePage from "./containers/PlacePage/PlacePage";

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

const Routes = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <Switch>
      <Route path="/" exact component={Places} />
      <ProtectedRoute
        isAllowed={user}
        path="/add-place"
        exact
        component={NewPlace}
      />
      <Route path="/places/:id" exact component={PlacePage} />
      <Route path="/places" exact component={Places} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
