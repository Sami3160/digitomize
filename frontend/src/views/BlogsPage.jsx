import { NavLink, useNavigate } from "react-router-dom"
function BlogsPage() {
    const navigate=useNavigate()
    return (
        <div className="pt-10">
            <h1 className="text-7xl text-white  mx-32 mt-16">Daily Blogs</h1>
            <h1 className="text-3xl text-white  mx-32 mt-5 ">
                Explore our blog: your coding corner with practical tips, breakthrough trends, and inspiring discussions. Grow your skills, share your voice, and design your tech future.
            </h1>
            <div className="max-w-screen-xl mx-auto p-16">

                <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">

                    {[1, 2, 3, 4, 5, 6,].map((ind, index) => (
                        <div key={ind}
                            className="bg-[#020617]  cursor-pointer hover:bg-[#101423] hover:text-white transition duration-300 max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="py-4 px-8">
                                <div className="flex items-center  gap-4 text-white">

                                    <img src="https://tailwindcss.com/img/jonathan.jpg" className="rounded-full h-12 w-12 mb-4" />
                                    <p className="text-xl">Ajay Patil</p>
                                </div><NavLink href="#">
                                    <h4 className="text-lg mb-3 text-white font-semibold">How to be effective at working remotely?</h4>
                                </NavLink>
                                <p className="mb-2 text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

                                <img src="https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" className="w-100" />

                                <hr className="mt-4" />
                                <p className="text-xs text-gray-200">12/05/2024</p>

                            </div>
                        </div>
                    ))}





                </div>
                <div className="w-full flex justify-center">

                    <button className="mt-10 bg-[#101423] rounded-full w-[70%]  border border-transparent font-medium hover:bg-slate-200 disabled:opacity-50 hover:dark:bg-slate-700 flex flex-row items-center focus:outline-none self-center  justify-center px-4 py-2 text-lg text-blue-600 dark:text-blue-500" type="button" >
                        <span>Load more</span>
                        <svg className="ml-3 h-5 w-5 fill-current" viewBox="0 0 448 512">
                            <path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z">

                            </path>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BlogsPage