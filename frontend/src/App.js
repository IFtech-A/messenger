import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { splitLink } from './queries/queries';
import Main from './Pages/Main/Main';
import {
  Route,
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import Signin from './Pages/Signin/Signin';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

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
              {/* <Login /> */}
              <Signin />
            </Route>
          </Switch>

        </div>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
