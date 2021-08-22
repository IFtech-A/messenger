import { gql } from "@apollo/client";

const getAllUsers = gql`
    query AllUsers{
        userReadAll {
            id
            name
        }
  }
`;

const getUser = gql`
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
const getUserMin = gql`
  query FindUser($user_id: ID!){
    userReadOne(id:$user_id) {
        id  
        name
    }
  }
`

const getAllRooms = gql`
  query AllRooms {
    roomReadAll {
        id
        title
    }  
  }
`

const getRoom = gql`
query FindRoom($room_id: ID!){
    roomReadOne(id: $room_id) {
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

const createMessage = gql`
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

export { getAllUsers, getUser, getUserMin, getAllRooms, getRoom, createMessage};