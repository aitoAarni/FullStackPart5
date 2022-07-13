import { Togglable } from './togglable'

const Blog = ({ blog, updatedLikes, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div className='blog' style={blogStyle}>
            <div>
                {blog.title} {blog.author}
            </div>
            <Togglable buttonLabel='show'>
                <div>
                    url: {blog.url}<br/>
                    likes: {blog.likes} <button className='like-button' onClick={() => {updatedLikes(blog)}}>like</button><br/>
                    {blog.user.name}<br/>
                    {blog.user.name === user.name ?
                        <button onClick={() => {removeBlog(blog)}}>remove</button>
                        : null} <br/>
                </div>
            </Togglable>
        </div>
    )
}


export { Blog }