import React from 'react'

function SuccessMessages({ head, description }) {
    return (
        <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
            <div
                className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
            >
                <div className="flex gap-2">
                    <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-white">{head || "done successfully :)"}</p>
                        <p className="text-gray-500">{description || "This is the description section"}</p>
                    </div>
                </div>
                <button
                    className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>

    )
}


function ErrorMessage({ head, description }) {
    return (
        /* From Uiverse.io by seyed-mohsen-mousavi */
        <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
            <div
                className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
            >
                <div className="flex gap-2">
                    <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <p className="text-white">{head || "Please try again"}</p>
                        <p className="text-gray-500">{description || "This is the description part"}</p>
                    </div>
                </div>
                <button
                    className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>

    )
}



export { SuccessMessages, ErrorMessage }