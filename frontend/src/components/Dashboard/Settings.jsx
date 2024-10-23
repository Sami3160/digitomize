import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import {FaBeer} from "@react"
import { FaEdit } from "react-icons/fa"
const SettingsModal = ({ isOpen, onRequestClose }) => {
    const { user, logout } = useContext(AuthContext)
    return (
        <div className={`fixed ${!isOpen && "hidden"} inset-0 z-[51]  overflow-y-auto modal `}>
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
            >
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={() => onRequestClose()}
                ></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;

                </span>
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

                            <div className="relative inline-block">
                                <img src={user?.profileUrl} className="w-28 h-28 rounded-xl" alt="" />
                                <FaEdit className="bg-blue-500 cursor-pointer text-white border rounded-lg text-2xl absolute p-1  bottom-1 -right-1" />

                            </div>
                            <div className="flex flex-col gap-2 w-[49%]">
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" placeholder="First name" />
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" placeholder="Last name" />
                                <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" placeholder="Username" />
                            </div>
                        </div>
                        <div className="flex  gap-2 w-full mt-3 ">
                            <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" placeholder="Address" />
                            <input type="text" className="border w-full rounded-lg text-lg p-1 px-2" placeholder="Institute name" />
                        </div>
                        <div className="mt-3 w-full ">

                            <label className="text-lg text-gray-400 font-normal ">Bio/Description</label>
                            <textarea className="border w-full rounded-lg text-lg p-1 px-2 ">

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
                            onClick={() => onRequestClose()}
                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm close-modal hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsModal;