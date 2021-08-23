import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { createUser, loginByName } from '../../queries/queries'

const Login = () => {

    const [name, setName] = useState("")
    const [loginFunc] = useMutation(loginByName, {
        variables: { name },
        onCompleted: (data) => { 
            if (!data) {
                console.error("login failed")
                return
            }
            localStorage.setItem("userID", data.login.id);
            localStorage.setItem("userName", data.login.name) 
        },
    })
    const [signUpFunc] = useMutation(createUser, {
        variables: { newUser: { name } },

        onCompleted: ({ createUser }) => { localStorage.setItem("userID", createUser.id); localStorage.setItem("userName", createUser.name); setLoginState(()=>false) },
    })
    const [loginState, setLoginState] = useState(true)

    const login = (e) => {
        e.preventDefault()

        if (name === "") {
            return;
        }

        if (loginState) {

            loginFunc();
        } else {
            signUpFunc()
        }


    }

    return (
        <div>
            <h3>{loginState?"Login":"Sign up"}</h3>
            <div>
                {/* <label for="username">Username</label> */}
                <input type="text" id="username" value={name} onInput={(e) => setName(() => e.target.value)} />
            </div>
            <div>
                <button onClick={login}>{loginState?"Login":"Sign up"}</button>
            </div>
            <div>
                <button onClick={()=>setLoginState((s)=>!s)}>{loginState?"Need to create an account?":"Already have an account?"}</button>
            </div>
        </div>
    )
}

export default Login
