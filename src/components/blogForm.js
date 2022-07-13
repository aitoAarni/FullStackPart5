import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
    setBlogs,
    createNotification,
    setUnvisible
}) => {
    const [newBlog, setNewBlog ] = useState({ title: '', author: '', url: '', likes: 0 })

    const addBlog = async (event) => {
        event.preventDefault()
        const content = await blogService.postBlog(newBlog)
        const updatedBlogs = await blogService.getAll()
        console.log('get content', updatedBlogs)
        setBlogs(updatedBlogs)
        setNewBlog({ title: '', author: '', url: '', likes: 0 })
        setUnvisible()
        createNotification(`new blogger: ${content.title}  by  ${content.author}`)
    }


    return (
        <div>
            <h2>blogs</h2>
            <br/>

            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input id='title'
                        value={newBlog.title}
                        onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                    />
                    <br/>
                </div>
                <div>
                    author:
                    <input id='author'
                        value={newBlog.author}
                        onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                    />
                    <br/>
                </div>
                <div>
                    url:
                    <input id='url'
                        value={newBlog.url}
                        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                    />
                    <br/>
                </div>

                <button id='create-blog' type="submit">save</button>
            </form>
        </div>
    )}

export { BlogForm }