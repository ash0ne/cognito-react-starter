import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";

import SectionOne from "./section1/section1";
import SectionTwo from "./section2/section2";

const Dashboard = ({ signOut, user }) => {
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState("section1");
  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const [tokens, setTokens] = useState({ accessToken: "", idToken: "" });
  useEffect(() => {
    const getTokens = async () => {
      try {
        const session = await fetchAuthSession();
        setTokens(session.tokens);
      } catch (error) {
        console.error("Error getting tokens:", error);
      }
    };
    getTokens();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav
          className="me-auto"
          style={{
            fontSize: "14px",
            fontFamily: "JetBrains Mono, monospace",
            marginLeft: "1em",
          }}
        >
          <NavLink onClick={handleHomeClick}>[Home]</NavLink>
          <NavLink
            onClick={() => handleNavItemClick("section1")}
            active={activeNavItem === "section1"}
          >
            [Section 1]
          </NavLink>
          <NavLink
            onClick={() => handleNavItemClick("section2")}
            active={activeNavItem === "section2"}
          >
            [Section 2]
          </NavLink>
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown
            style={{
              fontSize: "18px",
              fontFamily: "JetBrains Mono, monospace",
              marginRight: "1em",
            }}
            title={<span className="text-light">{user.username}</span>}
            id="basic-nav-dropdown"
            align="end"
          >
            <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <div className="main-content">
        {activeNavItem === "section1" && <SectionOne tokens={tokens} />}
        {activeNavItem === "section2" && <SectionTwo tokens={tokens} />}
      </div>
    </div>
  );
};

export default Dashboard;
