// image services
import axios from "axios";
import React from "react";

interface Image {
    id: number;
    title: string;
    description?: string;
    url: string;
}

export const fetchAllImages = async (searchTerm: string) => {
    if (searchTerm) {
        const { data } = await axios.get(`/api/image?search=${searchTerm}`) as { data: Image[] };
        return data as Image[];
    }
    const { data } = await axios.get("/api/image") as { data: Image[] };
    return data as Image[];
}

export const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('/api/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
        return error;
    });


    // promise, and console.log(response)

    return response.data;
};

export const deleteImage = async (id: number) => {
    await axios.delete(`/api/image/${id}`);
};


export const updateImage = async (id: number, data: any) => {
    const response = await axios.post(`/api/image/${id}`, data)
    console.log(response)
    return response.data;
}