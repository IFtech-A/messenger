import { gql, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/subscriptions',
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query'
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const createUser = gql`
  mutation CreateUser($newUser: NewUser!) {
    createUser(input: $newUser) {
      id
      name
    }
  }
`

export const loginByName = gql`
  mutation login($name: String!) {
    login(username: $name) {
      id
      name
    }
  }
`

export const getAllUsers = gql`
    query AllUsers{
        userReadAll {
            id
            name
        }
  }
`;

export const getUser = gql`
  query FindUser($user_id: ID!){
      userReadOne(id:$user_id) {
        id  
        name
        rooms{
            id
            title
        }
      }
  }
`
export const getUserMin = gql`
  query FindUser($user_id: ID!){
    userReadOne(id:$user_id) {
        id  
        name
    }
  }
`

export const getAllRooms = gql`
  query AllRooms ($userID: ID!){
    roomReadAll(userID: $userID) {
        id
        title
        lastMessage {
          content
          createdAt
          user {
            name
          }
        }
    }  
  }
`

export const getRoom = gql`
query FindRoom($id: ID!){
    roomReadOne(id: $id) {
        id
        title
        members
        messages {
            id
            userID
            content
            createdAt
        }
    }
}
`

export const createMessage = gql`
mutation MakeMessage($newMessage: NewMessage!) {
    createMessage(input: $newMessage) {
        id
        roomID
        userID
        content
        createdAt
    }
}
`

export const onCreateMessage = gql`
  subscription OnCreateMessage($id: ID!) {
    onMessageCreate(roomID: $id) {
      id
      userID
      content
      createdAt
    }
  }
`