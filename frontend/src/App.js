import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import RoomList from './components/ChatRoom/ChatRoomList';
import { splitLink } from './queries/queries';
import Login from './components/Login/Login';
import {
  Route,
  BrowserRouter as Router, Switch,
} from 'react-router-dom';

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
              <RoomList />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>

        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
