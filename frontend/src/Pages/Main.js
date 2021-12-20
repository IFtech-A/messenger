import Chat from './Chat'
import { selectUser } from "../store/user/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Main = () => {
  const navigate = useHistory();

  const user = useSelector(selectUser);
  if (!user) {
    navigate.push("/login");
    return <></>;
  }

  return <Chat  />;
};

export default Main;
