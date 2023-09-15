import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';

const Create = () => {

  const {data, setData, post, processing, errors } = useForm({
    id: '',
    name: '',
    description: '',
  }) 

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value
    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  function handleSubmit(e: any){
    console.log(data)
    router.post('/testimonials', data, {
      forceFormData: true,
    })
  }

  return (
    <>
    <h3 className='text-white text-[2rem] mb-[2rem] border-b-2'>Add Testimoni</h3>

    <div className="w-full h-auto flex justify-center items-center mb-[5rem]">

      <form onSubmit={handleSubmit} className='flex flex-col w-[80rem] text-[1.5rem]'>
        <input 
          type="text" 
          name="name" 
          id="name"
          placeholder='Your Name' 
          onChange={handleChange}
          className='h-[4rem] text-[1.5rem] rounded'
        />
        
        <textarea 
          typeof='text' 
          name="description" 
          id="description" 
          cols={30} rows={10} 
          placeholder='Your Testimony'
          onChange={handleChange}
          className='my-[15px] text-[1.5rem] rounded'
          >
        </textarea>
        
        <button
          type='submit'

          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Submit
        </button>
      </form>

    </div>
      
    </>
  );
};

export default Create;