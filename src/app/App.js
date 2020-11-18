import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
// "unstable_createMuiStrictModeTheme"
// Used due to an error in Material UI. It should be solve in V5.
import {
  MuiThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { selectUser } from "..//features/auth/userSlice";

import { Header } from "../features/header";
import { Menu } from "../features/menu";
import { Cart } from "../features/cart";
import { Order } from "../features/order";
import { SignIn, SignUp } from "../features/auth";
import { Profile } from "../features/profile";

const theme = createMuiTheme({
  overrides: {
    MuiNativeSelect: {
      select: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "&:hover $notchedOutline": {
          borderColor: "#0000003b",
        },
      },
    },
  },
});

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const App = () => {
  const { user } = useSelector(selectUser);

  const token = localStorage.getItem("token");

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={Menu} />
            <Route path="/cart" component={Cart} />
            <Route path="/order" component={Order} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <PrivateRoute
              authed={!!token && !!user.email}
              path="/profile"
              component={Profile}
            />
          </Switch>
        </Container>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
