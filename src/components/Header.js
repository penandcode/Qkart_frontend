import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const username = localStorage.getItem("username");
  const history = useHistory();

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      ) : username ? (
        <Stack direction="row" alignItems="center">
          <Avatar src="avatar.png" alt={username} />
          <p style={{ marginTop: "13px" }}>{username}</p>
          <Button
            // className="button"
            color="success"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            LOGOUT
          </Button>
        </Stack>
      ) : (
        <Stack direction="row">
          <Button
            variant="text"
            color="success"
            onClick={() => history.push("/login")}
          >
            LOGIN
          </Button>
          <Button
            name="logout"
            className="button"
            variant="contained"
            onClick={() => history.push("/register")}
          >
            REGISTER
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
