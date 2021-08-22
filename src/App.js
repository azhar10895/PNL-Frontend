import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Trades/dashboard";
import LoginPage from "./components/authentication/Login/LoginPage";
import Trades from "./components/Trades/TradesLogs";
//import SignupForm from './components/SignupForm';
import Settings from "./components/Trades/settings";
import Permissions from "./components/authentication/permissions/index";
import HistoryDashboard from "./components/Trades/historyDashboard";
import GuardedRoute from "./components/authentication/guarded-route";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <GuardedRoute exact path="/dashboard" component={Dashboard} componentIndex={1} />
          <GuardedRoute exact path="/trades" component={Trades} componentIndex={2}/>
          <GuardedRoute exact path="/history" component={HistoryDashboard} componentIndex={3}/>
          <GuardedRoute exact path="/permissions" component={Permissions} componentIndex={4} />
          <GuardedRoute exact path="/settings" component={Settings} componentIndex={5}/>
          <Route
            path="*"
            component={() => {
              return "404 Not found";
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
