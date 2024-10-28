import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';
import { FaWindowClose, FaEdit, FaRemoveFormat } from "react-icons/fa"
import axios from "axios";
import BlogContentInput from "./BlogContentInput";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { IoMdCloseCircle } from "react-icons/io";
const NewBlogModal = ({ isOpen, onRequestClose }) => {
    const { user, logout } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState({
        tags: [],
        category: "Article",
        _id: user?._id
    })
    const [imageChanged, setImageChanged] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }
    }, [user])

    const handleContentChange = (value) => {
        console.log(value)
        setBlogData((prevData) => ({
            ...prevData,
            content: value,
        }));
    }

    const handleSave = async () => {
        setLoading(true)
        if (blogData["title"] && blogData["content"] && blogData["category"] && blogData["tags"] <= 0) {
            setLoading(false)
            alert("Please fill the form")
            return
        }
        try {

            if (!blogData) return
            setBlogData((bData) => { return { ...bData, _id: user._id } })
            console.log(blogData)

            await axios.post("http://localhost:5000/api/blog/create", blogData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBlogData({
                tags: [],
                category: "Article"
            })
            console.log(blogData)
            setTimeout(()=>onRequestClose(), 2000)
            setLoading(false)
            alert("New blog posted successfully")
            // onRequestClose()
        } catch (error) {
            console.log(error)
            console.log(error.message)
            console.log(error.response)
            setLoading(false)
            // setTimeout(()=>onRequestClose(), 2000)
            alert(error.message)
            // onRequestClose()
        }
    }

    return (
        <div className={`fixed ${!isOpen && "hidden"} inset-0 z-[51]   overflow-y-auto modal `}>
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
            >
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={() => onRequestClose()}
                >
                </div>

                <div
                    className="inline-block relative px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-[#0D1517]  rounded-lg shadow-xl sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
                >
                    <div className="absolute top-0">
                        <IoMdCloseCircle className=""/>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium leading-6 text-gray-400">Create New Blog</h3>
                        <div className="mt-2 flex items-center gap-3">
                            <img src={user?.profileUrl} className="w-10 h-10 rounded-full border " alt="" />
                            <p className="text-lg text-gray-500">{user?.firstname} {user?.lastname}</p>
                        </div>
                    </div>
                    <BlogTitleInput head={"Blog Title*"} onTitleChange={(T) => setBlogData((bData) => { return { ...bData, title: T } })} />
                    <label htmlFor="title" className="mb-2 text-lg font-bold text-gray-300">
                        Blog Thumbnail
                    </label>
                    <div className="mt-2 flex flex-col items-start w-full bg-black/30">

                        <div className="flex justify-between w-full">
                            {
                                blogData.image ? (
                                    <div className="w-full relative">
                                        <FaWindowClose className="absolute right-2 top-2 h-10 w-10 cursor-pointer shadow-lg text-red-600"
                                            onClick={() => setBlogData((bData)=>{return{ ...bData, image: null }})}
                                        />
                                        <img src={URL.createObjectURL(blogData.image)} className="w-full object-cover max-h-[25rem] rounded-md" alt="" />
                                    </div>
                                ) : (
                                    <div className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
                                        <input type="file" accept="image/png, image/gif, image/jpeg" className="absolute inset-0 w-full h-full opacity-0 z-50" name="thumbnailUrl" onChange={(e) => setBlogData((bData)=>{return { ...bData, image: e.target.files[0] }})} />
                                        <div className="text-center">
                                            <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />

                                            <h3 className="mt-2 text-sm font-medium text-gray-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer">
                                                    <span>Drag and drop</span>
                                                    <span className="text-indigo-600"> or browse </span>
                                                    <span>to upload</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </h3>
                                            <p className="mt-1 text-xs text-gray-300">
                                                Include picture for thumbnail
                                            </p>
                                        </div>

                                        <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
                                    </div>
                                )
                            }
                        </div>


                    </div>
                    <BlogContentInput head={"Blog Content*"} onContentChange={handleContentChange} />
                    <div className="grid grid-cols-2 gap-4">

                        {/* tags */}

                        <div className="gap-2">
                            <label htmlFor="tags" className="mb-2 text-lg font-bold text-gray-300">
                                Enter Tags <span className="text-xs font-thin">(eg: java, binary search, machine learning)</span>
                            </label>
                            <input type="text" id="tags" className="w-full mt-2 text-md bg-black/30 focus:outline-none text-white p-3 border border-gray-700 rounded-md" name=""
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const tag = e.target.value.trim()

                                        if (!(blogData.tags.includes(tag))) {
                                            setBlogData((bData) => {
                                                bData.tags.push(tag)
                                                return bData;
                                            })
                                        }
                                        e.target.value = ""
                                    }
                                }}
                            />
                            <div className="bg-[#0D1117] p-2 w-[90%] mx-auto border border-gray-700 border-t-0 flex gap-3 flex-wrap">
                                {
                                    blogData.tags.map((tag, index) => {
                                        return (
                                            <div key={index} className="flex items-center bg-slate-500/20 p-1 px-2 rounded-xl w-auto">
                                                <span className="text-xs text-gray-400 ">{tag}</span>
                                                <FaWindowClose className="text-red-500 ml-2 cursor-pointer"
                                                    onClick={() => {
                                                        setBlogData((bData) => {
                                                            const arr = bData.tags.filter((t) => t != tag)
                                                            bData.tags = arr
                                                            return bData;
                                                        })
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>


                        {/* category */}
                        <div>
                            <label htmlFor="category" className="mb-2 text-lg font-bold text-gray-300">
                                Blog Category*
                            </label>
                            <select
                                name="category"
                                id="category"
                                onChange={(e)=>setBlogData((bData)=>{return {...bData,category:e.target.value}})}
                                className="w-full mt-2 p-3 text-gray-100 bg-black/30 border border-gray-700 rounded-md outline-none"
                            >
                                <option value="Article">Article</option>
                                <option value="Project">Project</option>
                                <option value="Tutorial">Tutorial</option>
                                <option value="Challenge">Challenge</option>
                            </select>
                        </div>



                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="mt-5 sm:mt-6 flex gap-5">
                            <button
                                onClick={() => onRequestClose()}
                                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="mt-5 sm:mt-6 flex gap-5">
                            <button
                                onClick={() => handleSave()}
                                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            >
                                {loading ? 'Posting new blog...' : 'Post'}
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};



const BlogTitleInput = ({ head, onTitleChange }) => {
    const titleRef = useRef(null);

    const handleInput = () => {
        const newTitle = titleRef.current.innerText;
        if (onTitleChange) {
            onTitleChange(newTitle);
        }
    }; return (
        <div className="flex flex-col my-5">
            <label htmlFor="title" className="mb-2 text-lg font-bold text-gray-300">
                {head}
            </label>
            <div
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                id="title"
                onInput={handleInput}
                className="p-3 text-lg text-gray-100 bg-black/30 border border-gray-700 rounded-md min-h-[40px] outline-none"
                placeholder="Enter the title of your blog..."
            >
            </div>
        </div>
    );
};


export default NewBlogModal;