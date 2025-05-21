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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
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

            await axios.post(`${apiBaseUrl}/blog/create`, blogData, {
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
        <div className={`fixed inset-0 z-[51] overflow-y-auto ${!isOpen && "hidden"} modal`}>
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onRequestClose}
            aria-hidden="true"
          />
      
          {/* Modal Container */}
          <div className="relative z-10 inline-block w-full max-w-5xl transform overflow-hidden rounded-2xl bg-[#0D1517] p-6 text-left align-middle shadow-xl transition-all sm:my-8 sm:align-middle">
            
            {/* Close Icon */}
            <button
              onClick={onRequestClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition"
              aria-label="Close modal"
            >
              <IoMdCloseCircle size={28} />
            </button>
      
            {/* Title + User Info */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-300">Create New Blog</h3>
              <div className="mt-2 flex items-center gap-3">
                <img src={user?.profileUrl} className="w-10 h-10 rounded-full border" alt="User" />
                <p className="text-lg text-gray-400">{user?.firstname} {user?.lastname}</p>
              </div>
            </div>
      
            {/* Blog Title Input */}
            <BlogTitleInput head="Blog Title*" onTitleChange={(T) =>
              setBlogData((bData) => ({ ...bData, title: T }))
            } />
      
            {/* Thumbnail Upload */}
            <div className="mt-4">
              <label className="mb-2 text-lg font-bold text-gray-300">Blog Thumbnail</label>
              <div className="mt-2 w-full bg-black/30">
                {blogData.image ? (
                  <div className="relative w-full">
                    <button
                      className="absolute right-2 top-2 z-10 text-red-600 hover:scale-105 transition"
                      onClick={() => setBlogData((bData) => ({ ...bData, image: null }))}
                    >
                      <FaWindowClose size={24} />
                    </button>
                    <img
                      src={URL.createObjectURL(blogData.image)}
                      className="w-full max-h-[25rem] object-cover rounded-md"
                      alt="Thumbnail Preview"
                    />
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center border-2 border-dashed border-gray-500 rounded-lg p-6">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        setBlogData((bData) => ({ ...bData, image: e.target.files[0] }))
                      }
                    />
                    <img
                      className="mx-auto h-12 w-12"
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt="Upload Icon"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                      Drag and drop or <span className="text-indigo-400 underline">browse</span> to upload
                    </p>
                  </div>
                )}
              </div>
            </div>
      
            {/* Blog Content */}
            <div className="mt-4">
              <BlogContentInput head="Blog Content*" onContentChange={handleContentChange} />
            </div>
      
            {/* Tags + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Tags */}
              <div>
                <label className="mb-2 text-lg font-bold text-gray-300">
                  Enter Tags <span className="text-xs font-thin">(e.g., React, AI)</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 text-white bg-black/30 border border-gray-700 rounded-md focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const tag = e.target.value.trim();
                      if (tag && !blogData.tags.includes(tag)) {
                        setBlogData((bData) => ({ ...bData, tags: [...bData.tags, tag] }));
                      }
                      e.target.value = "";
                    }
                  }}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {blogData.tags.map((tag, index) => (
                    <span key={index} className="flex items-center px-2 py-1 bg-slate-500/20 rounded-full text-sm text-gray-300">
                      {tag}
                      <FaWindowClose
                        className="ml-2 text-red-500 cursor-pointer"
                        onClick={() =>
                          setBlogData((bData) => ({
                            ...bData,
                            tags: bData.tags.filter((t) => t !== tag),
                          }))
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>
      
              {/* Category */}
              <div>
                <label className="mb-2 text-lg font-bold text-gray-300">Blog Category*</label>
                <select
                  className="w-full mt-2 p-3 text-white bg-black/30 border border-gray-700 rounded-md"
                  value={blogData.category}
                  onChange={(e) => setBlogData((bData) => ({ ...bData, category: e.target.value }))}
                >
                  <option value="">-- Select --</option>
                  <option value="Article">Article</option>
                  <option value="Project">Project</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Challenge">Challenge</option>
                </select>
              </div>
            </div>
      
            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={onRequestClose}
                className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${loading && "opacity-70 cursor-not-allowed"}`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
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
            <label htmlFor="blog-title" className="mb-2 text-lg font-semibold text-gray-300">
                {head}
            </label>

            <div className="relative">
                <div
                ref={titleRef}
                id="blog-title"
                contentEditable
                role="textbox"
                aria-multiline="false"
                suppressContentEditableWarning
                onInput={handleInput}
                className="p-3 text-lg text-white bg-black/30 border border-gray-700 rounded-md min-h-[48px] outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
                ></div>

                {/* Fake placeholder for contentEditable */}
                {!titleRef?.current?.textContent?.trim() && (
                <span className="absolute left-3 top-3 text-gray-500 pointer-events-none text-lg select-none">
                    Enter the title of your blog...
                </span>
                )}
            </div>
            </div>

    );
};


export default NewBlogModal;