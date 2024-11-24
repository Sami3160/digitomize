import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUnlink } from "react-icons/fa";
const LinkModal = ({ isOpen, onRequestClose }) => {
    const [platformLists, setPlatformLists]=useState({})
    const {user}=useContext(AuthContext)
    useEffect(()=>{
        const update=async()=>{
            console.log(user?._id);
            
            const res=await axios.get(`http://localhost:5000/api/portfolio/linkedaccounts?_id=${user?._id}`)

            console.log(res.data)
            setPlatformLists(res.data)
        }
        update()
    },[])
    const logoMap = {
        "Leetcode": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png",
        "Codeforces": "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-codeforces-programming-competitions-and-contests-programming-community-logo-filled-tal-revivo.png",
        "GfG": "https://digitomize.com/assets/geeksforgeeks-1a83bb08.svg",
        "CodeChef": "https://digitomize.com/assets/codechef-f6a4f2da.svg",
        "GitHub": "https://img.icons8.com/ios-glyphs/30/github.png",
        "HackerRank": "https://img.icons8.com/windows/32/hackerrank.png",
        "CodingNinjas": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaGVYSWZNTQAqAAAACAAEAQYAAwAAAAEAAgAAARIAAwAAAAEAAQAAASgAAwAAAAEAAgAAh2kABAAAAAEAAAA+AAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABfoAMABAAAAAEAAABfAAAAAPfNbXAAAAP5SURBVHicvZZPaFxVFMa/79z73mTG2Fg0pLUmbWyTagJKERFDNYILbVpQDK0uBK1pElLcuNCFS8GNIKhV1CiKoCCNrQspKP6BqMWNEanFP4lJkyxKxGqNTSYz8969x0WccTKZxHTy5ywevPfuvd/vnXfuPR+xghjubWiRmLfR4GZV7BDySq9qSehK5pcLBRBSnrLLDOB4z/b7lOxV1TYbyCYhoAVJVqoNAvAAcuqvKQswfGTXdeMSvyDCTkMg8kDsK/7YpQDUAH4RwLm+7TfCxR8kLFsysSJeM9nyIcU3P/Y0bFXHgdCyZS7Wyn9wJQAKMFB5PmnZmok3QroEYKy74e7Q4NDcBooDQL4GqODjVmiWKzYCMEJI5RugsI4H6LyKBYDRnuvrAXdXzi0tHhoicorI+wkAUwSiVQKogH/MZ4DxHQkxNdklAEJDxE4/VeVzgfVDDa9O/kWsTY1aAFBFG5dIa8IQGafv+YTtaj72a3YtRBcAHD8IQ7C13K+3QmSdn/BR9onm/qk1FwcA217bkpyJ0tvKAQQCxA7vN7899TsA3PnA/iYNoswWX3N+YGDAXY7QLQcOpBLJqD4LNzU08Nl0AWA6l7tKiM1eFxIQQM4pFBjMP3PUI0YT3ed1dnxvZ8dPSj1rlL945fdfnzw1lh/X/kh7VTRTfauh360euyFsBX0TVFIphnsB/AfgJao2iqC0uZCAU42s6ET+mVG+6b3rCsJgD4A9AOCi+Izz2gdgrHi+QPcp5ckgGVhVBUDEUe7FrwY+Olc8zoZkQkuO5HwoGHnD2fz9lydPjdx+6N59jKI+gBbA54KZE9+cGJwpnjf4zmAGwNNtBzuOR7noQYI7Vd235or0S6UaHO1rvAmxnhZBdXEdCAGvSAu1tfH1ifFygGsRAkEG1EUFpQBUNfSxbFovcQCQbOQuQZFddAwoEBixavyudQWoQe20kn+y5CRSzG9DKO5ZV4Br+4fmAJ0s12ByTiFk58jRneuWBSGgBM6UA3AKhIZXS+zeGO1qrFsPAALASM/2+xMiH0ZLtOLQEDmvP8PzFSPui5j2QhjlVu3W6k3dJQLA8OEttRIkfrDCOufLDw7+9QHZ2GcVvEhqrlLhgiklHi0kfrR7x1vJgIf/zxEJ5xcoLdoKAKDOdxRcsad/ORPLQ0Ikl3PghXdauR0oyoAWjuCm/snvFHqsyq7Sb11mLOgBqXTmmXTkP0kFGwexAGDru7/NViHxcDqnH6csYTaAY1EX3NY/fOEis51zsT4L1b+TlrBCrKLmlo1llx3ubWgJIY95oEMVjVZYRWLVdjS/C7z6/Sv6rrNHW6pTcbrVAzcI0OCBzVS1lXJw/qLi8No/YzuoX35Hj9UAAAAASUVORK5CYII=",
    }


  const [showUnlinkButton, setShowUnlinkButton] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleUnlinkClick = (platform) => {
    setCurrentPlatform(platform);
    setShowConfirmation(true); // Show confirmation dialog
  };


  const handleConfirmUnlink = async () => {
    try {
      // Make the DELETE request to unlink the account
      const response = await axios.delete(
        `http://localhost:5000/api/users/unlinkAccount?_id=${user?._id}&platform=${currentPlatform}`
      );
  
      // Log the success message
      console.log(`Unlinked successfully from ${currentPlatform}`);
  
      // Use platformKeyMap to get the correct key for the current platform
      const keyToUpdate = platformKeyMap[currentPlatform];
  
      // Update the platformLists state by setting the username to null for the platform
      setPlatformLists(prevLists => ({
        ...prevLists,
        [keyToUpdate]: null,  // Set the platform username to null
      }));
  
      // Close the confirmation dialog
      setShowConfirmation(false);
  
      // Optionally, handle the response data if needed
      console.log(response.data);
    } catch (error) {
      console.error("Error unlinking account:", error);
      // Optionally, handle the error (e.g., show an alert or message to the user)
    }
  };
  


  const handleCancelUnlink = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    setCurrentPlatform(null);
  };
  const platformKeyMap = {
    Codeforces: "cfUsername",
    GitHub: "githubUsername",
    CodeChef: "ccUsername",
    Leetcode: "lcUsername",
    HackerRank: "hrUsername",
    GfG: "gfgUsername",
    CodingNinjas: "cnUsername",
  };

  const handleAddClick = (platform) => {
    setSelectedPlatform(platform);
    setShowModal(true);
  };

  const handleSave = async () => {
    const key = platformKeyMap[selectedPlatform]; // Get the key for the selected platform
    const platformName = selectedPlatform.toLowerCase(); // Platform name in lowercase
    const userId = user?._id; // Dynamic user ID
  
    try {
      // API call to link accounts
      await axios.post(
        `http://localhost:5000/api/users/linkAccounts?_id=${userId}&platform=${platformName}`,
        {
          username: inputValue, // Send the username in the body
        }
      );
  
      // Update the local state
      platformLists[key] = inputValue;
      setShowModal(false);
      setInputValue("");
      console.log("Account linked successfully!");
    } catch (error) {
      console.error("Failed to link account:", error.response?.data || error.message);
    }
  };

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
                    className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-[#0D1517] rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <div>
                        <h3 className="text-lg font-bold leading-6 text-white">Link Other Accounts</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-300">Connect to other platforms to get up-to-date progress tracking.</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 items-center mt-10 px-10">
                        {Object.keys(logoMap).map((platform) => (
                            <div
                            key={platform}
                            className="relative w-full text-lg gap-3 bg-black/30 text-slate-300 cursor-pointer justify-between items-center border border-gray-700 rounded-lg p-1 px-6 flex"
                            onMouseEnter={() => setShowUnlinkButton(platform)}
                            onMouseLeave={() => setShowUnlinkButton(null)}
                            >
                            {/* Platform Info */}
                            <span className="flex gap-3">
                                <img
                                src={logoMap[platform]}
                                alt={`${platform} logo`}
                                className="h-7 w-7 bg-slate-100 rounded-full p-[1px]"
                                />
                                {platform}
                            </span>

                            <span className="flex gap-3 justify-center items-center " >
                            {/* Displaying platform username or Add component */}
                            {platformLists[platformKeyMap[platform]] ? (
                                <p className="text-sm mx-1 text-gray-500">
                                {platformLists[platformKeyMap[platform]]}
                                </p>
                            ) : (
                                <Add handleAddClick={handleAddClick} platform={platform} />
                            )}
                            </span>


                            {/* Unlink Button with Slide-out Effect */}
                            {platformLists[platformKeyMap[platform]] && (
                                <FaUnlink
                                className={`absolute -right-6 opacity-0 text-gray-500 w-4 h-4 hover:text-red-400 transition-all duration-600 ease-in-out ${
                                    showUnlinkButton === platform ? "opacity-100" : "opacity-0"
                                }`}
                                onClick={() => handleUnlinkClick(platform)}
                                />
                            )}
                            </div>
                        ))}
            </div>
            
        </div>


         {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Username for {selectedPlatform}</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter username/handle"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

          {/* Confirmation Dialog */}
         {showConfirmation && currentPlatform && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/60 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#1d1d1d] p-6 rounded-lg text-center text-white w-1/2 text-lg">
                        <p>
                        Are you sure you want to unlink your {currentPlatform} account?
                        </p>
                        <div className="mt-4 flex justify-center gap-3">
                        <button
                            className="bg-green-500 w-1/4 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            onClick={handleConfirmUnlink}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-500 w-1/4 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            onClick={handleCancelUnlink}
                        >
                            No
                        </button>
                        </div>
                    </div>
                    </div>
                )}
        </div>
        </div>
    );
};

const Add = ({_id, platform,onRequestClose ,handleAddClick}) => {
    
    const handleSubmit= async ()=>{
        try {
            const result=await axios.post(`http://localhost:5000/api/portfolio/linkedaccounts?_id=${_id}&platform=${platform}`)
            alert('Account linked!')
            onRequestClose();
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        /* From Uiverse.io by mRcOol7 */
        <button
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            title="Add New"
            onClick={() => handleAddClick(platform)}
        >
            <svg
                className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeWidth="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
        </button>

    )
}
export default LinkModal;