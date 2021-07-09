import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./views/NavBar/index";
import {Users} from "./containers/UsersContainer";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <NavBar />
                    </Route>
                    <Route path="/users">
                        <NavBar />
                        <Users />
                    </Route>
                    <Route path="/login">
                        <NavBar />
                        login
                    </Route>
                    <Route path="/register">
                        <NavBar />
                        register
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
