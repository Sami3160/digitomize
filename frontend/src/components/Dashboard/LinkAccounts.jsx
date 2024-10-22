const LinkModal = ({ isOpen, onRequestClose }) => {

    return (
        <div className={`fixed ${!isOpen && "hidden"} inset-0 z-[51]  overflow-y-auto modal `}>
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
            >
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={() => onRequestClose()}
                ></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div
                    className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Link Other Accounts</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">This is a simple modal example.</p>
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
export default LinkModal;