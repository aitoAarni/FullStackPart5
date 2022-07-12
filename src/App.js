import { useState, useEffect, useRef } from 'react'
import { Blog } from './components/Blog'
import { ErrorMessage, Notification } from './components/notifications'
import blogService from './services/blogs'
import { Togglable } from './components/togglable'
import { LoginForm } from './components/loginForm'
import { BlogForm } from './components/blogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setError] = useState('')
    const [notification, setNotification] = useState('')

    const blogFormRef = useRef()

    const setBlogsAndSort = blgs => {
        const sortedBlogs = blgs.sort((a, b) => {return b.likes - a.likes})
        setBlogs(sortedBlogs)
    }


    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedUser')
        if (loggedUserJson) {
            setUser(JSON.parse(loggedUserJson))
            blogService.setToken(JSON.parse(loggedUserJson).token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogsAndSort(blogs)
        )
    }, [])

    const toggleVisibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    const createNotification = msg => {
        setNotification(msg)
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    const createError = msg => {
        setError(msg)
        setTimeout(() => {
            setError('')
        }, 5000)
    }



    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        createNotification('loggedi out')
    }

    const updatedLikes = async (blog) => {
        blog.likes ++
        await blogService.updateLikes(blog)
        const returnBlogs = blogs.map(blg => blg.id === blog.id ? blog : blg)

        setBlogsAndSort(returnBlogs)
    }

    const removeBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){

            blogService.deleteBlog(blog)
            const newBlogs = blogs.filter(blg => {
                return blg.id !== blog.id
            })
            setBlogsAndSort(newBlogs)
        }

    }



    return (
        <div>
            <ErrorMessage message={errorMessage} />
            <Notification message={notification} />

            {(user === null) ?
                <div>
                    <Togglable buttonLabel='login'>
                        <LoginForm setUser={setUser} createError={createError} createNotification={createNotification} />
                    </Togglable>
                </div>
                :
                <div>
                    <h2>Blogs</h2>
                    {user.name} logged in!
                    <button onClick={handleLogout} name='logout'>logout</button>
                    <Togglable buttonLabel='create blog' ref={blogFormRef}>
                        <BlogForm setBlogs={setBlogsAndSort} createNotification={createNotification} setUnvisible={toggleVisibility} />
                    </Togglable>
                    <div>
                        {blogs.map(blog => <Blog key={blog.id} blog={blog} updatedLikes={updatedLikes} removeBlog={removeBlog} user={user} />)}
                    </div>
                </div>
            }




        </div>
    )
}

export default App
