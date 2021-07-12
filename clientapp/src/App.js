import {Container} from "@material-ui/core";
import {AppRouter} from "./AppRouter";

function App() {

    return (
        <Container maxWidth="lg">
            <div className="App">
                <AppRouter />
            </div>
        </Container>
    );
}

export default App;
