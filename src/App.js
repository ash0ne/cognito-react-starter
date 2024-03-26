import React from "react";
import { Amplify } from "aws-amplify";
import { Heading, View } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import awsExports from "./aws-exports";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NotFound from "./components/notfound/notfound";

const headingStyle = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: "1.5em",
  color: "#343a40",
  paddingLeft: "1em",
  paddingRight: "1em",
  paddingTop: "1em",
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: awsExports.USER_POOL_ID,
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
    },
  },
});

const components = {
  Header() {
    return <View paddingTop="2em"></View>;
  },
  SignIn: {
    Header() {
      return <Heading style={headingStyle}> [Your Login Heading] </Heading>;
    },
  },
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that require authentication */}
        <Route
          path="/dashboard"
          element={
            <Authenticator hideSignUp components={components}>
              {({ signOut, user }) =>
                user ? (
                  <Dashboard signOut={signOut} user={user} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            </Authenticator>
          }
        />

        {/* Routes that don't require authentication */}
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
