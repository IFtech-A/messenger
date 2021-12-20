import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { splitLink } from './queries/queries';
import Main from './Pages/Main';
import {
  Route,
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import Signin from './Pages/Signin';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import SignUp from './Pages/Signup';

const theme = createTheme();

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})


function App() {

  return (
    <Router>

      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                {/* <RoomList /> */}
                <Main />
              </Route>
              <Route exact path="/login">
                <Signin />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>

          </div>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
