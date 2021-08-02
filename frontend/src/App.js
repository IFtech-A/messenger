import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import UserList from './components/User/UserList';
import RoomList from './components/Room/RoomList';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
})

function App() {

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <RoomList/>
      <UserList />
    </div>
    </ApolloProvider>
  );
}

export default App;
