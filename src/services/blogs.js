import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const setToken = newToken => {
    token = `bearer ${newToken}`
    console.log(token)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postBlog = (content) => {
    const config = {
        headers: { Authorization: token }
    }
    console.log('config', config)
    const request = axios.post(baseUrl, content, config)
    return request.then(response => response.data)
}


const updateLikes = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const request = await axios.put(baseUrl + `/${blog.id}`, blog, config)
    return request.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(baseUrl + `/${blog.id}`, config)
}

export default { getAll, postBlog, updateLikes, deleteBlog, setToken }