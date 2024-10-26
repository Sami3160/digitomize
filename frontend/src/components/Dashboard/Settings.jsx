import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import {FaBeer} from "@react"
// import { IoIosCloseCircle } from "react-icons/io"
import { FaWindowClose, FaEdit, FaRemoveFormat } from "react-icons/fa"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SettingsModal = ({ isOpen, onRequestClose }) => {
    const { user, logout } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({})
    const [imageChanged, setImageChanged] = useState(false)
    const navigate=useNavigate()
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    useEffect(()=>{
        if(!user){
            navigate("/login")
            return
        }
    },[user])
    const handleImg = (e) => {
        setImageChanged(true)
        setUserData({ ...userData, profileUrl: e.target.files[0] })
    }

    const handleSave = async () => {
        setLoading(true)
        let flag1 = true;
        for (const key in userData) {
            if (userData[key].length>0 || key==="profileUrl") flag1 = false;
            if (!flag1) break
        }
        if(flag1){
            setLoading(false)
            alert("Please fill the form")
            return
        }

        try {
            if (userData.profileUrl) {
                await handleImageSave()
                let flag = true;
                for (const key in userData) {
                    if (key !== "profileUrl" && userData[key].trim().length > 0) flag = false;
                    if (!flag) break
                }
                if(flag)return
            }
            if (!userData) return
            const form = new FormData()
            for (const key in userData) {
                form.append(key, userData[key])
            }
            form.append("_id", user._id)
            console.log(form);
            
            await axios.post("http://localhost:5000/api/users/updateUser", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            for (const key in userData) {
                setUserData((udata) => { return { ...udata, [key]: "" } })
                console.log(key)

            }
            console.log(userData)
            setLoading(false)
            alert("Data updated successfully")
        } catch (error) {
            setLoading(false)
            alert("Error in updating data")
        }
    }
    const handleImageSave = async () => {
        const form = new FormData()
        form.append("image", userData.profileUrl)
        form.append("_id", user._id)
        
        try {
            const result=await axios.post("http://localhost:5000/api/users/updateProfile", form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(result){
                alert("Image uploaded successfully")
                setLoading(false)
                return;
            }
        } catch (error) {
            setLoading(false)
            alert(error.message)
        }
    }
    return (
        <div className={`fixed ${!isOpen && "hidden"} inset-0 z-[51]  overflow-y-auto modal `}>
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
            >
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={() => onRequestClose()}
                >
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;

                    </span>
                </div>

                <div
                    className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
                >
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Update Profile</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">This is a simple modal example.</p>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-start w-full">
                        <div className="flex justify-between w-full">

                            <div className="profile relative inline-block">
                                <img src={imageChanged ? URL.createObjectURL(userData?.profileUrl) : (user?.profileUrl)} className="w-28 h-28 rounded-xl object-cover" alt="" />
                                <FaEdit
                                    className="bg-blue-500 cursor-pointer text-white border rounded-lg text-2xl absolute p-1  bottom-1 -right-1"
                                    onClick={() => document.getElementById("fileInput").click()}
                                />
                                {
                                    imageChanged && (
                                        <FaWindowClose
                                            className="bg-red-500 cursor-pointer text-white border rounded-lg text-2xl absolute p-1  bottom-1 right-5"
                                            onClick={() => {
                                                document.getElementById("fileInput").value = "";
                                                setUserData({ ...userData, profileUrl: null })
                                                setImageChanged(false)
                                            }}
                                        />
                                    )
                                }
                                <input id="fileInput" type="file" className="hidden" accept="image/png, image/gif, image/jpeg" name="profileUrl" onChange={handleImg} />
                            </div>
                            <div className="flex flex-col gap-2 w-[49%]">
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" onChange={handleChange} name="firstname" placeholder="First name" value={userData["firstname"]} />
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" onChange={handleChange} name="lastname" placeholder="Last name" value={userData["lastname"]} />
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" onChange={handleChange} name="username" placeholder="Username" value={userData["username"]} />
                            </div>
                        </div>
                        <div className="flex flex-wrap  gap-2 w-full mt-3 ">
                            <input type="text" className="border w-[49%] rounded-lg text-lg p-1 px-2" onChange={handleChange} name="institute" placeholder="Institute name" value={userData["institute"]} />
                            <input type="text" className="border w-[49%] rounded-lg text-lg p-1 px-2" onChange={handleChange} name="password" placeholder="Password" value={userData["password"]} />
                            <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" onChange={handleChange} name="address" placeholder="Address" value={userData["address"]} />
                        </div>
                        <div className="mt-3 w-full ">

                            <label className="text-lg text-gray-400 font-normal ">Bio/Description</label>
                            <textarea className="border w-full rounded-lg text-lg p-1 px-2 " value={userData["bio"]} onChange={handleChange} name="bio">

                            </textarea>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex gap-5">
                        <button
                            onClick={() => onRequestClose()}
                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => handleSave()}
                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            {loading ? 'Saving info...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsModal;