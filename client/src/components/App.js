import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../App.css";
import Home from "../pages/Home";
import Register from './../pages/Register';
import Login from './../pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route />
          <Route />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
