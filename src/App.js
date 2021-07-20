import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard";
import LoginPage from "./components/Login/LoginPage";


//import SignupForm from './components/SignupForm';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
