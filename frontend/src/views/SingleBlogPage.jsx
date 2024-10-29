import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { FaComment, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { IoMdClose } from 'react-icons/io';

function SingleBlogPage() {
    const { user } = useContext(AuthContext)
    const [liked, setLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const navigate = useNavigate()

    const [blogData, setBlogData] = useState({})
    const searchParams = new URLSearchParams(window.location.search)
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    };
    const handleLike = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/blog/updateLike', {
                params: {
                    user_id: user?._id,
                    blog_id: searchParams.get('id'),
                }
            })
            setLiked((prev) => !prev)
        } catch (error) {
            console.log("like update error :", error.message)
            console.log(error)
            return error
        }
    }
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blog/getOneBlog', {
                    params: {
                        _id: searchParams.get('id'),
                    }
                })
                setBlogData(response?.data?.blogData)
                if (response?.data?.blogData?.likes.includes(user?._id)) {
                    setLiked(true)
                }
                // response.data?.blogData?.comments.map((comment)=>{
                //     comment.author?._id===user._id
                // })


                // if(response.data.)
            } catch (error) {
                console.log("blogs fetching error :", error.message)
                console.log(error)
                return error
            }
        }
        // setBlogs()
        fetchBlogs()
    }, [location.href, window.location.search, liked])


    return (
        <div className='pt-20 relative' >
            {showComments && <CommentsModal setShowComments={setShowComments} comments={blogData?.comments} />}
            <main className="container mx-auto mt-8 bg-[#111111] p-4 ">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-8/12 p-4 mb-8 bg-[#212121]">
                        <img src={blogData?.thumbnailUrl} alt="Featured Image" className="w-full h-64 object-cover rounded" />
                        <h2 className="text-4xl font-bold mt-4 mb-2 text-white">{blogData?.title}</h2>
                        <p className="text-gray-300 mb-4 mt-4">
                            <div className="" dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
                        </p>
                    </div>
                    <div className="w-full md:w-4/12 px-4 mb-8 flex flex-col gap-4">
                        <div className="bg-[#212121] px-4 py-6  rounded">

                            <h3 className="text-lg font-bold mb-2 text-white">Author</h3>
                            <div className="w-full">

                                <div className="flex gap-2 items-center "
                                >
                                    <img src={blogData?.owner?.profileUrl} className='h-10 w-10 rounded-full' />
                                    <ul className="">

                                        <li className="text-slate-200 font-bold text-lg">{blogData?.owner?.firstname} {blogData?.owner?.lastname}</li>
                                        <li className="text-slate-400 text-xs font-[50]">{blogData?.owner?.username}</li>
                                    </ul>
                                </div>
                                <span className='text-white text-lg mt-1 font-extralight'>Blogs created {blogData?.owner?.blogs?.length}</span>
                                <div
                                    className="button w-[60%] cursor-pointer  md:w-[94%] lg:w-[60%] hover:bg-blue-700 bg-blue-600 text-white border-[0.5px] border-white mx-0 md:mx-auto lg:mx-0 p-1 rounded-xl text-center mt-2"
                                    onClick={() => navigate(`/profile/${blogData?.owner?._id}`)}

                                >
                                    View profile
                                </div>
                            </div>

                            <div className=" flex flex-wrap mt-3 gap-10 text-white">
                                <div className="flex flex-col gap-1 items-center">
                                    <FaHeart className={`h-5 w-5 cursor-pointer  ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
                                        onClick={() => {
                                            if (!user) {
                                                alert('Please login to like the blog')
                                            } else {
                                                handleLike()
                                            }
                                        }}
                                    />
                                    <div>

                                        {blogData?.likes?.length}
                                    </div>
                                    Likes
                                </div>
                                <div className="flex flex-col gap-1 items-center">
                                    <FaComment className="h-5 w-5 cursor-pointer hover:text-blue-500"
                                        onClick={() => setShowComments(true)}
                                    />
                                    <div>

                                        {blogData?.comments?.length}
                                    </div>
                                    Comments
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 mt-2 text-white">Comments</h3>
                            <ul className="">
                                <li className="text-slate-300">{blogData?.category}</li>
                            </ul>

                        </div>
                        <div className="bg-[#212121] px-4 py-6  rounded">

                            <h3 className="text-lg font-bold mb-2 text-white">Blog Category</h3>
                            <ul className="">
                                <li className="text-slate-300">{blogData?.category}</li>
                            </ul>
                            <h3 className="text-lg font-bold mb-2 mt-2 text-white">Tags</h3>
                            <ul className="flex gap-2 flex-wrap">
                                {
                                    blogData?.tags?.map((tag, index) => (
                                        <div key={index} className="text-slate-300">{tag}</div>
                                    ))
                                }
                            </ul>
                            <h3 className="text-lg font-bold mb-2 mt-2 text-white">Likes</h3>
                            <ul className="">
                                <li className="text-slate-300">{blogData?.category}</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}



const CommentsModal = ({ setShowComments, comments }) => {
    const navigate=useNavigate()
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    };

    console.log(comments)
    return (
        <div className="absolute shadow-xl z-10 top-1/4 bg-black/95 rounded-xl right-5 w-[90vw] md:w-[40vw] h-[60vh]">
            <div className="relative w-full h-full  p-4 ">
                <IoMdClose className='w-6 h-6 cursor-pointer  bg-white absolute right-1 top-1'
                    onClick={() => setShowComments(false)}
                />
                <h4 className='text-white text-xl'>Comments</h4>
                <div className="comments ares flex flex-col w-full h-[75%] mt-3 overflow-y-auto">
                    {
                        comments?.length > 0 ? comments?.map((comment, index) => {
                            return (
                                <div key={index} className="bg-[#212121] p-2 rounded-lg mb-2">
                                    <div className="flex gap-2 items-center">
                                        <img src={comment?.author?.profileUrl} className='h-10 w-10 rounded-full cursor-pointer hover:shadow-lg' 
                                            onClick={()=>navigate(`/profile/${comment?.author?._id}`)}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-white font-bold">{comment?.author?.username}</p>
                                            <p className="text-gray-300 text-xs">{formatDateTime(comment?.createdAt)}</p>
                                        </div>
                                    </div>
                                    <p className="text-white">{comment?.content}</p>
                                </div>
                            )
                        })
                            :
                            (
                                <div className='text-2xl text-white'>No comments yet</div>
                            )
                    }
                </div>
                <div className="flex bg-white rounded-b-lg">
                    <input type="text" placeholder='Add  new comment' className='w-full rounded-b-lg focus:outline-none text-lg p-1' />
                    <div className="button bg-blue-600  text-white text-lg p-1 rounded-br-lg px-3 cursor-pointer">Add</div>
                </div>
            </div>
        </div>
    )
}
export default SingleBlogPage