import TheHeader from "./components/layout/TheHeader";
import Sidebar from "./components/layout/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/layout/Chat";
// import { useState } from "react";
import Login from "./components/layout/Login";
import { useStateValue } from "./StateProvider";

function App() {
  // const [user, setUser] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user && <Login />}
      {user && (
        <Router>
          <TheHeader />
          <div className="app__body">
            <Sidebar />

            <Switch>
              <Route path="/room/:roomId">
                <Chat />
              </Route>
              <Route>
                <h1>Welcome</h1>
              </Route>
            </Switch>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
