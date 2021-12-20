import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { createUser } from "../queries/queries";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUp, selectUser } from "../store/user/userSlice";

const SignUp = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigation = useHistory();
  const user = useSelector(selectUser);

  const [signUpFunc] = useMutation(createUser, {
    variables: { newUser: { name } },
    onCompleted: (data) => {
      if (!data) {
        alert("Sign up failed");
        return;
      }

      const { createUser } = data;
      dispatch(signUp(createUser));
    },
  });

  if (user) {
    navigation.replace("/");
    return;
  }

  const register = () => {
    if (name === "") {
      return;
    }

    signUpFunc();
  };

  return (
    <div>
      <h3>Sign up</h3>
      <div>
        <input
          type="text"
          id="username"
          value={name}
          onInput={(e) => setName(() => e.target.value)}
        />
      </div>
      <div>
        <button onClick={register}>Sign up</button>
      </div>
      <div>
        <button onClick={() => navigation.replace("/login")}>
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default SignUp;
