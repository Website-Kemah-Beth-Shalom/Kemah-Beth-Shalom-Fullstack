// Admin Video Page
import { AdminTopBar } from '@/Components/Admin-Layout-Component';
import { AddButton, CloseButton, ViewButton } from '@/Components/Button';
import { EditIcon } from '@/Components/Icon';
import { InputError, Label } from '@/Components/Input';
import { ModalOverlay } from '@/Components/Modal';
import AdminLayout from '@/Layouts/AdminLayout'
import { parseYoutubeLink } from '@/Utils/ParseYoutubeLink';
import { DevTool } from '@hookform/devtools';
import { router } from '@inertiajs/react';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AdminVideoPage({ videos }: { videos: any[] }) {
  const [isModalVideoOpen, setIsModalVideoOpen] = React.useState(false)
  const handleOpenModalVideo = () => {
    setIsModalVideoOpen(true)
  }

  return (
    <>
      <AdminLayout>
        <div
          className='flex flex-col gap-2 p-boxS max-w-screen overflow-x-hidden'
        >
          <AdminTopBar
            title='Video'
          >
            <ViewButton
              onClick={() => window.open('/gallery', '_blank')}
            />
            <AddButton
              onClick={handleOpenModalVideo}
            />
          </AdminTopBar>


          {/* mapping content */}
          {
            videos.map((video, index) => (
              <div
                key={index}
                className='flex flex-row gap-2 items-center justify-between
                        p-2 bg-white rounded-lg shadow-md'
              >
                <div
                  className='flex flex-row gap-2 items-center'
                >
                  {/* <img
                    className='w-[10rem] h-[10rem] object-cover  shadow-sm
                  border border-gray-300'
                    src={video.thumbnail}
                    alt="" /> */}
                  <iframe

                    className='w-[10rem] h-[10rem] object-cover  shadow-sm
                    border border-gray-300'
                    src={parseYoutubeLink(video.link)}
                    title={video.title}
                  ></iframe>
                  <div
                    className='flex flex-col gap-2 items-start'
                  >
                    <h1
                      className='text-primaryBlack font-semibold'
                    >
                      {video.title}
                    </h1>
                    <p
                      className='text-gray-500'
                    >
                      {video.link}
                    </p>
                  </div>
                </div>
                <div
                  className='flex flex-row gap-2 items-center'
                >
                  <Button
                    className='bg-primaryAdmin text-white'
                    type='primary'
                    icon={<EditIcon />}
                  >
                    test
                  </Button>
                </div>
              </div>
            ))
          }
        </div>
      </AdminLayout>




      {/* modal */}
      <VideoModal
        onClose={() => setIsModalVideoOpen(false)}
        show={isModalVideoOpen}
      />
    </>
  );
}

interface VideoModalProps {
  onClose: () => void
  show: boolean
}



interface SubmitData {
  title: string,
  link: string,
}

const VideoModal = (props: VideoModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SubmitData>({ defaultValues: {} })

  const onSubmit = handleSubmit((data: any) => {
    console.log('data: ', data)
    router.post('/admin/video/add', data, {
      onSuccess: () => {
        toast.success('Video added successfully')
        props.onClose()
        router.reload()
      },
      onError: () => {
        toast.error('Failed to add video')
      }
    })
  });

  return (
    <>
      <button
        type='button'
      >
        <img
          className='w-[10rem] h-[10rem] object-cover  shadow-sm
                  border border-gray-300'
          alt="" />
      </button>

      {/* Modal */}
      <ModalOverlay
        onClose={props.onClose}
        show={props.show}
      >
        <section
          className='flex flex-col gap-2 items-start justify-center bg-white
                  p-boxS rounded-xl shadow-xl'
        >
          <header
            className='flex flex-row
                      gap-2 items-center
                      justify-between w-full
                      min-w-[20rem] h-[3rem]
                      '
          >
            <h1
              className='capitalize text-primaryBlack font-semibold '
            >
              Add Video
            </h1>
            <CloseButton
              onClick={props.onClose}
            />
          </header>
          {/* Form */}

          <form
            className='flex flex-col gap-2 items-start justify-center bg-white w-full'
          >
            <Label
              required
            >
              Title
            </Label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg'
              type="text"
              placeholder="Title"
              {...register('title', { required: true })}
            />
            <InputError
              message={errors.link && "Title is required"}
            />
            <Label
              required
            >
              Link
            </Label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg'
              type="text"
              placeholder="Link"
              {...register('link', { required: true })}
            />
            <InputError
              message={errors.link && "Link is required"}
            />
          </form>

          <button
            onClick={onSubmit}
            className='bg-primaryAdmin text-white p-boxS rounded-lg w-full hover:opacity-90 '
          >
            Create
          </button>
        </section>

      </ModalOverlay >
    </>
  )
}