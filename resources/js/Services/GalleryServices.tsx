import axios from "axios";
import React from "react";

export const fetchAllGalleryImages = async (searchTerm = "") => {
    if (searchTerm) {
        const { data } = await axios.get(`/api/gallery?search=${searchTerm}`);
        return data;
    }
    const response = await axios.get("/api/gallery").then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
        return error;
    });
    return response.data;
};



export const uploadGalleryImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('/api/gallery', formData, {
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

    return response.data;
}

export const deleteGalleryImage = async (id: number) => {
    await axios.delete(`/api/gallery/${id}`);
};

export const changeStatusGalleryImage = async (id: number, status: boolean) => {

    const num_status = status ? 1 : 0;
    await axios.patch(`/api/gallery/`, {
        id: id,
        is_display: num_status
    });
}