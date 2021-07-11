import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Container} from "@material-ui/core";
import {Users} from "./containers/FORDECONLYUsersContainer";
import {LoginContainer} from "./containers/LoginContainer";
import {RegisterContainer} from "./containers/RegisterContainer";
import {ProfileContainer} from "./containers/ProfileContainer";
import PrivateRoute from "./PrivateRoute";
import {NavBarContainer} from "./containers/NavBarContainer";

function App() {
    return (
        <Container maxWidth="lg">
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <NavBarContainer />
                        </Route>
                        <Route exact path="/users">
                            <Users />
                        </Route>
                        <Route exact path="/login">
                            <LoginContainer />
                        </Route>
                        <Route path="/register">
                            <RegisterContainer />
                        </Route>
                        <PrivateRoute
                            path="/profile"
                            component={()=>(<ProfileContainer />)}
                        />
                    </Switch>
                </Router>
            </div>
        </Container>
    );
}

export default App;
