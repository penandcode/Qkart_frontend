import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  // eslint-disable-next-line
  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value,
    });
  };
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  // eslint-disable-next-line
  const login = async (formData) => {
    try {
      setLoading(true);
      const data = { username: formData.username, password: formData.password };
      const response = await axios.post(`${config.endpoint}/auth/login`, data);
      const res = response.data;
      setLoading(false);
      if (response.data.success) {
        persistLogin(res.token, res.username, res.balance);
        enqueueSnackbar("Logged in successfully", {variant: "success"});
        history.push("/", { from: "Login" });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  // eslint-disable-next-line
  const validateInput = (data) => {
    if (data.username.length === 0) {
      enqueueSnackbar("Username is a required field", { variant: "error" });
    } else if (data.password.length === 0) {
      enqueueSnackbar("Password is a required field", { variant: "error" });
    } else {
      login(formData);
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  // eslint-disable-next-line
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
    localStorage.setItem("token", token);
  };

  if (loading) {
    return <CircularProgress />;
  } else
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header 
         />
        <Box className="content">
          <Stack spacing={2} className="form">
            <h2 className="title">Login</h2>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              helperText="Password must be atleast 6 characters length"
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              className="button"
              variant="contained"
              onClick={() => validateInput(formData)}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  // sx={{
                  //   color: green[500],
                  //   position: 'absolute',
                  //   top: '50%',
                  //   left: '50%',
                  //   marginTop: '-12px',
                  //   marginLeft: '-12px',
                  // }}
                />
              ) : (
                "Login to Qkart"
              )}
            </Button>
            <p className="secondary-action">
              Don't have an account?{" "}
              <Link className="link" to="/register">
                Register Now
              </Link>
            </p>
          </Stack>
        </Box>
        <Footer />
      </Box>
    );
};

export default Login;
