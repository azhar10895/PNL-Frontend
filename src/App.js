import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Trades/dashboard";
import LoginPage from "./components/authentication/Login/LoginPage";
import Trades from "./components/Trades/TradesLogs";
//import SignupForm from './components/SignupForm';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path ="/trades" component = {Trades}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
