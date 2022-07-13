import { useState } from 'react'
import blogService from '../services/blogs'
import { login } from '../services/user'


const LoginForm = ({
    setUser,
    createError,
    createNotification
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            const user = await login({ 'username': username,'password': password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser' ,JSON.stringify(user))
            setUsername('')
            setPassword('')
            createNotification('Loggedi in')
        }
        catch (exception) {
            console.log(exception)
            createError('invaliidi kredentiaaali')
        }
    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                <p >Username</p>
                <input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                <p>Password</p>
                <input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id='login-button' type="submit">login</button>
        </form>
    )}

export { LoginForm }