import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Trades/dashboard";
import LoginPage from "./components/authentication/Login/LoginPage";
import Trades from "./components/Trades/TradesLogs";
//import SignupForm from './components/SignupForm';
import Settings from "./components/Trades/settings";
import HistoryDashboard from "./components/Trades/historyDashboard"
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path ="/trades" component = {Trades}/>
          <Route exact path ="/settings" component = {Settings}/>
          <Route exact path="/history" component={HistoryDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
