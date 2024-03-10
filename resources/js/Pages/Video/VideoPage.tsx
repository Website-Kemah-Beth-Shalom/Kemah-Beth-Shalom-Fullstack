// VideoPage.tsx
import Guest from '@/Layouts/GuestLayout';
import { parseYoutubeLink } from '@/Utils/ParseYoutubeLink';
import { usePage } from '@inertiajs/react';

export default function VideoPage({ videos }: any) {
  const companyData: any = usePage().props.companyData;
  const { data } = videos;
  return (
    <Guest
    >
      <div
        className='flex flex-col items-center gap-4 w-full  text-center p-boxS rounded-md'
      >
        <section
          className='flex flex-col items-start gap-4 w-full  text-left p-boxS rounded-md'
        >
          <h1 className="font-merriweather text-[3rem] text-accent font-bold ">
            {companyData.video_title || 'Video'}
          </h1>
          <hr className="w-[30%] h-[0.1rem] bg-accent mb-[1rem]" />
          {/* Content */}
          <p
            className="text-primaryBlack font-jost w-full max-w-[60rem] text-[1.125rem]
                        text-left"
          >
            {companyData.blog_description}
          </p>
        </section>

        {/* mapping section */}
        <section
          className=' items-center gap-4 w-full  text-center p-boxS rounded-md grid grid-cols-1 md:grid-cols-2'
        >
          {
            data.map((video: any, index: number) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-2 p-boxS w-full border-2 border-accent rounded-md shadow-md"
              >
                <h2 className="font-merriweather text-[1.5rem] text-accent font-bold">
                  {video.title}
                </h2>
                <iframe
                  className='w-full bg-primaryBlack rounded-md shadow-md aspect-video'
                  src={parseYoutubeLink(video.link)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))
          }
        </section>
      </div>
      <div>
        {/* next page and prev page */}
        <div className="flex justify-center gap-4 mt-4">
          {
            // pagination
            videos.links.map((link: any, index: number) => (
              <button
                dangerouslySetInnerHTML={{ __html: link.label }}
                key={index}
                className="bg-accent text-white p-2 rounded-md shadow-md py-2 px-4 hover:bg-primaryBlack transition-all duration-300 ease-in-out"
              >
                {/* {link.label} */}
              </button>
            ))
          }
        </div>
      </div>
    </Guest >
  );
}

