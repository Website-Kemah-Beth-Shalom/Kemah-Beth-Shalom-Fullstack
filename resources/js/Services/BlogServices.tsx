import axios from 'axios';

export const CreateBlog = async (data: any) => {
    console.log("create data", data)
    const response = await axios.post('/api/blog/create', data)
    console.log(response)
    return response.data;
}

export const SaveBlogasDraft = async (data: any) => {
    console.log("requested data", data)
    const response = await axios.post('/api/blog/saveasdraft', data)
    console.log(response)
    return response.data;
}

export const fetchAllBlog = async () => {
    const response = await axios.get('/api/blog')
    return response.data;
}

export const fetchBlog = async (id: any) => {
    const response = await axios.get(`/api/blog/${id}`)
    return response.data;
}


export const deleteBlog = async (id: any) => {
    const response = await axios.delete(`/api/blog/${id}`)
    return response.data;
}