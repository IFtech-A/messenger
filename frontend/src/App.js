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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

function App() {

  return (
    <Router>

      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </Router>
  );
}

export default App;
