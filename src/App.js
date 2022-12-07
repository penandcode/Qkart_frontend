// eslint-disable-next-line
import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
// eslint-disable-next-line
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
// eslint-disable-next-line
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";

export const config = {
  endpoint: `https://lakshit-qkart-frontend.herokuapp.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/thanks" component={Thanks} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
