import { Avatar, Container, CssBaseline, TextField, Typography, Button } from '@mui/material'
import LockoutOutlinedIcon from '@mui/icons-material/LockOutlined'
import {makeStyles} from '@mui/styles'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { loginByName } from '../queries/queries'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => {

    return {
        signin: {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        }
    }
})

const Signin = () => {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [loginErr, setLoginErr] = useState('')

    const [loginFunc] = useMutation(loginByName, {
        variables: { name: username },
        onCompleted: (userData) => {
            if (!userData) {
                console.warn(`Sign in for user ${username} failed.`);
                return;
            }

            localStorage.setItem('userID', userData.login.id);
            localStorage.setItem('userName', userData.login.name);
            setIsLoggedIn(true);
        },
        onError: err => {
            console.error(err);
            alert('Login failed. Try again');
            // setLoginErr('Login failed. Try again');
        }
    });

    const handleSubmit = event => {
        event.preventDefault();

        if (username === "") {
            return;
        }

        loginFunc();
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box className={classes.signin}>
                <Avatar className={classes.avatar}>
                    <LockoutOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        margin='normal'
                        required
                        fullWidth
                        id='name'
                        label='Full name'
                        name='name'
                        autoComplete='full name'
                        autoFocus
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}>
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Signin
