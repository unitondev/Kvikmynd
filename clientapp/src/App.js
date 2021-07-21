import {Container} from "@material-ui/core";
import {AppRouter} from "./AppRouter";

const App = () => (
    <Container maxWidth="lg">
        <div className="App">
            <AppRouter />
        </div>
    </Container>
);

export default App;
