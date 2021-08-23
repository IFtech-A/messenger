import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import RoomList from './components/Room/RoomList';
import { splitLink } from './queries/queries';

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RoomList />
      </div>
    </ApolloProvider>
  );
}

export default App;
