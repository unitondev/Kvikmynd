import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./views/NavBar/index";
import {Users} from "./containers/UsersContainer";
import {LoginContainer} from "./containers/LoginContainer";
import {Container} from "@material-ui/core";
import {RegisterContainer} from "./containers/RegisterContainer";

function App() {
    return (
        <Container maxWidth="lg">
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <NavBar />
                        </Route>
                        <Route exact path="/users">
                            <NavBar />
                            <Users />
                        </Route>
                        <Route exact path="/login">
                            <LoginContainer />
                        </Route>
                        <Route path="/register">
                            <RegisterContainer />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Container>
    );
}

export default App;
