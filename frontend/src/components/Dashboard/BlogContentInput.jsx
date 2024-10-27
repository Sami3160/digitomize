import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const BlogContentInput = ({ head, onContentChange }) => {
    const [content, setContent] = useState('');
    const handleChange = (value) => {
        setContent(value);
        if (onContentChange) {
            onContentChange(value);
        }
        
    };

    return (
        <div className="flex flex-col my-5">
            <label htmlFor="content" className="mb-2 text-lg font-bold rounded-md text-gray-300">
                {head}
            </label>
            <ReactQuill
                value={content}
                onChange={handleChange}
                modules={BlogContentInput.modules}
                formats={BlogContentInput.formats}
                className="bg-black/30 text-gray-100 "
                placeholder="Write your blog content here..."
            />
        </div>
    );
};

BlogContentInput.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'color': [] }, { 'background': [] }],
    ],
};

BlogContentInput.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background'
];

export default BlogContentInput;