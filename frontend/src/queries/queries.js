import {gql} from "@apollo/client";

const getAllUsers = gql`
    query AllUsers{
        users{
            id
            name
        }
  }
`;

const getUser = gql`
  query FindUser($user_id: String!){
      user(id:$user_id) {
        id  
        name
        rooms{
            id
            name
        }
      }
  }
`
const getUserMin = gql`
  query FindUser($user_id: String!){
      user(id:$user_id) {
        id  
        name
      }
  }
`

const getAllRooms = gql`
  query AllRooms {
      rooms {
          id
          name
      }
  }
`

const getRoom = gql`
  query FindRoom($room_id: String!){
      room(id: $room_id) {
          id
          name
          members
      }
  }
`

export {getAllUsers, getUser, getUserMin, getAllRooms, getRoom};