import axios from 'axios';
import React from 'react'



export const AddNewProduct = async (data: any) => {
    const result = await axios.post('/api/product/create', data)
    return result.data;
}

export const UpdateProduct = async (data: any) => {
    const result = await axios.post('/api/product/update', data)
    return result.data;
}


export const AddNewAddOn = async (data: any) => {
    const result = await axios.post('/api/product/addon/create', data)
    return result.data;
}

export const UpdateAddOn = async (data: any) => {
    const result = await axios.post('/api/addon/update', data)
    return result.data;
}

export const AddNewMaterial = async (data: any) => {
    const result = await axios.post('/api/product/material/create', data)
    return result.data;
}


export const EditMaterial = async (data: any) => {
    const result = await axios.post('/api/product/material/update', data)
    return result.data;
}


export const AddNewMaterialItem = async (data: any) => {
    const result = await axios.post('/api/product/material/item/create', data)
    return result.data;
}

export const EditMaterialItem = async (data: any) => {
    const result = await axios.post('/api/product/material/item/update', data)
    return result.data;
}