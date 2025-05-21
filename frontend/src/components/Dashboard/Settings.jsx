import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import {FaBeer} from "@react"
// import { IoIosCloseCircle } from "react-icons/io"
import { FaWindowClose, FaEdit, FaRemoveFormat } from "react-icons/fa"
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
const SettingsModal = ({ isOpen, onRequestClose }) => {
    const { user, logout } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        _id: localStorage.getItem("user").replaceAll('"', ''),
    })
    // console.log(typeof user?._id, user?._id)
    // console.log(typeof localStorage.getItem("user"), localStorage.getItem("user"))
    const [imageChanged, setImageChanged] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (!user) {
            navigate("/login")
            return
        }
    }, [user])
    const handleImg = (e) => {
        setImageChanged(true)
        setUserData({ ...userData, profileUrl: e.target.files[0] })
    }

    const handleSave = async () => {
        setLoading(true)
        let allEmpty = true;
        // const requiredData=[]
        // console.log(userData)
        for (const key in userData) {
            if (userData[key] && userData[key].length > 0) {
                allEmpty = false;
                break;
            }
        }
        if (allEmpty && !userData.profileUrl) {
            alert("Please fill the form")
            setLoading(false)
            return
        }

        try {
            if (userData.profileUrl) {
                await handleImageSave()
            }
            const form = new FormData()
            for (const key in userData) {
                form.append(key, userData[key])
                if (!userData[key] || userData[key] === "") {
                    delete userData[key]
                }
            }

            await axios.post(`${apiBaseUrl}/users/updateUser`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            for (const key in userData) {
                if(key!=="_id")setUserData((udata) => { return { ...udata, [key]: "" } })
            }
            setLoading(false)
            alert("Data updated successfully")
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert("Error in updating data")
        }
    }
    const handleImageSave = async () => {
        const form = new FormData()
        form.append("image", userData.profileUrl)
        form.append("_id", localStorage.getItem("user").replaceAll('"', ''))

        try {
            const result = await axios.post(`${apiBaseUrl}/users/updateProfile`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (result) {
                alert("Image uploaded successfully")
                setLoading(false)
                setImageChanged(false)
                return;
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setImageChanged(false)
            alert(error.message)
        }
    }
    return (
        <div className={`fixed inset-0 z-[51] overflow-y-auto ${!isOpen && "hidden"}`}>
        <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
            onClick={onRequestClose}
          ></div>
      
          {/* Modal Box */}
          <div className="relative z-10 w-full max-w-3xl sm:rounded-2xl bg-[#121212] border border-[#2d2d2d] text-white shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Update Profile</h3>
            <p className="text-sm text-gray-400 mb-6">Update your profile information here.</p>
      
            {/* Content */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Image */}
              <div className="relative self-center">
                <img
                  src={imageChanged ? URL.createObjectURL(userData?.profileUrl) : user?.profileUrl}
                  className="w-28 h-28 rounded-xl object-cover border border-[#3a3a3a]"
                  alt="profile"
                />
                <FaEdit
                  className="absolute bottom-1 right-1 text-white bg-cyan-600 hover:bg-cyan-700 p-1 rounded-lg text-2xl cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                />
                {imageChanged && (
                  <FaWindowClose
                    className="absolute bottom-1 right-10 text-white bg-red-600 hover:bg-red-700 p-1 rounded-lg text-2xl cursor-pointer"
                    onClick={() => {
                      document.getElementById("fileInput").value = "";
                      setUserData({ ...userData, profileUrl: null });
                      setImageChanged(false);
                    }}
                  />
                )}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                  name="profileUrl"
                  onChange={handleImg}
                />
              </div>
      
              {/* Input Fields */}
              <div className="flex flex-col w-full gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={userData.firstname}
                    onChange={handleChange}
                    className="w-1/2 bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={userData.lastname}
                    onChange={handleChange}
                    className="w-1/2 bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                  className="w-full bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="institute"
                  placeholder="Institute name"
                  value={userData.institute}
                  onChange={handleChange}
                  className="w-full bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <div className="mt-2">
                  <label className="text-sm text-gray-400">Bio / Description</label>
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    className="w-full mt-1 bg-[#1f1f1f] text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>
      
            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={onRequestClose}
                className="px-5 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold"
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