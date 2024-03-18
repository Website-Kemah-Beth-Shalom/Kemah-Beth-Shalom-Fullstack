import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import "@/Styles/global.scss"
import { InertiaLinkProps, Link, router } from '@inertiajs/react'
import { HamburgerIcon } from '@/Components/Icon';
import { Confirmation } from '@/Components/Confirmation';


export default function AdminLayout({ header, children, title }: {
    header?: string, children?: ReactNode, title?: string
}) {
    const [showingSidebar, setShowingSidebar] = useState(true);
    const [currentRoute, setCurrentRoute] = useState('')
    useEffect(() => {
        const curr = route().current()?.split('.')[1]
        setCurrentRoute(curr as string)
        console.log("current route", curr)
    }, [route().current()])


    const handleLogout = () => {
        // e.preventDefault();
        router.post(route('logout'));
    }

    return (
        <>
            <div className="w-full min-h-screen bg-white">
                {/* top navbar */}
                <nav
                    className='w-full h-[4rem] sticky
                    bg-primaryAdmin px-[1rem] py-[0.3rem]
                    top-0 z-50 flex flex-row items-center justify-between'
                >

                    {/* Toogle Open/Close Sidebar */}
                    <div
                        className='flex flex-row items-center justify-start gap-2.5'
                    >
                        <button
                            onClick={() => setShowingSidebar(!showingSidebar)}
                            className={`
                    bg-transparent border-none outline-none
                    px-[1rem] py-[0.3rem] rounded-md
                    text-[1.25rem] text-white
                    hover:bg-gray-900 transition duration-300 ease-in-out
                    `}
                        >
                            <HamburgerIcon />
                        </button>

                        <h1
                            className='text-white text-[1.5rem] font-bold capitalize h-full flex items-center justify-center'
                        >
                            {/* {currentRoute} */}
                            {title ? title : currentRoute}
                        </h1>
                    </div>
                    {/* log out button */}
                    <Confirmation
                        title='Log Out'
                        description='Are you sure you want to log out?'
                        onConfirm={handleLogout}
                    >
                        <button
                            className={`
                    bg-gray-900 hover:bg-gray-800
                    border-none outline-none
                    px-[1rem] py-[0.3rem] rounded-md
                    text-[1.25rem] text-white`}
                        >
                            Log Out
                        </button>
                    </Confirmation>
                </nav>


                <div
                    className='flex flex-row items-start justify-start w-full h-full'

                >
                    {/* sidebar */}
                    <nav
                        id='sidebar'
                        className={`flex flex-col justify-center items-center w-[15rem] h-screen
                        fixed
                        top-[4rem] bg-gray-100
                        border-r border-gray-200 px-[1rem] py-[1rem]
                        transition duration-300 ease-in-out
                        `}
                        style={{
                            transition: 'margin-left 300ms ease-in-out',
                            marginLeft: showingSidebar ? '0rem' : '-15rem'
                        }}
                    >
                        <h1
                            id='sidebar-title'
                            className='w-full text-left text-primaryAdmin font-semibold'
                        >
                            Manage Pages
                        </h1>
                        <div
                            className='flex flex-col justify-start items-start w-full h-full gap-1'
                        >
                            {/* <Link
                                href={'/admin/order'}
                                className={`flex flex-row items-center justify-between
                            w-full h-[3rem] rounded-md outline-none
                            px-[1rem] py-[0.3rem]
                            text-[1rem] text-[#000000] hover:text-[#000000]
                            hover:bg-gray-200 transition duration-300 ease-in-out
                            cursor-pointer ${route().current() === 'admin.order' ? 'bg-primaryAdmin text-white font-bold' : ''}`}
                            >
                                <span
                                    className='flex flex-row items-center gap-2.5'
                                >
                                    <img
                                        src={"https://www.svgrepo.com/show/532088/bell.svg"}
                                        alt=""
                                        className={`w-[1.5rem] h-[1.5rem] ${route().current() === 'admin.order' ? 'filter invert' : ''}`}
                                    />
                                    Order
                                </span>
                            </Link> */}
                            {
                                Route.map((item, index) => {
                                    return (
                                        <SidebarItem
                                            key={index}
                                            name={item.name}
                                            path={item.path}
                                            route={item.route}
                                            icon={item.icon}
                                            active={item.route === currentRoute}
                                        />
                                    )
                                }
                                )
                            }
                        </div>
                    </nav>
                    <main
                        className={`bg-white h-full ml-[15rem] w-full`}
                        style={{
                            transition: 'margin-left 300ms ease-in-out',
                            marginLeft: showingSidebar ? '15rem' : '0rem'
                        }}
                    >
                        {children}
                    </main>
                </div>

            </div >
        </>
    )
}


const Route = [
    {
        name: 'Content',
        path: '/admin/webconfig',
        route: 'webconfig',
        icon: 'https://www.svgrepo.com/show/378674/people-group.svg'
    },
    {
        name: 'Gallery',
        path: '/admin/gallery',
        route: 'gallery',
        icon: 'https://www.svgrepo.com/show/509190/picture.svg'
    },
    {
        name: 'Blogs',
        path: '/admin/blog',
        route: 'blog',
        icon: 'https://www.svgrepo.com/show/478768/blog-writing.svg'
    },
    {
        name: 'Videos',
        path: '/admin/video',
        route: 'video',
        icon: 'https://www.svgrepo.com/show/525163/video-frame-play-vertical.svg'
    },
    {
        name: 'Profile',
        path: '/admin/profile',
        route: 'user',
        icon: 'https://www.svgrepo.com/show/512729/profile-round-1342.svg'
    }
]



const SidebarItem = ({ name, path, route, active, icon }: {
    name: string, path: string, route: string, active: boolean, icon?: string
}) => {
    // if current route is start with path, then active
    useEffect(() => {
        console.log("path", path)
        console.log("start with", route.startsWith(path))
    }, [route, path])
    return (
        <Link
            href={path}
            className={`flex flex-row items-center justify-between
            w-full h-[3rem] rounded-md outline-none
            px-[1rem] py-[0.3rem]
            text-[1rem] text-[#000000]
            hover:opacity-60 transition duration-300 ease-in-out
            cursor-pointer
            ${active ? 'bg-primaryAdmin text-white font-bold' : ''}`}
        >
            <span
                className='flex flex-row items-center gap-2.5'
            >
                <img
                    src={icon}
                    alt=""
                    className={`w-[1.5rem] h-[1.5rem] ${active ? 'filter invert' : ''}`}
                />
                {name}
            </span>
        </Link>
    )
}

