const HackathonCard = ({ hackathon }) => {
  const { name, host, url, registerationEndTimeUnix, registerationStartTimeUnix } = hackathon;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-[#161a1b] rounded-lg shadow-md p-4 mb-4 min-h-52 border-2 border-white flex flex-col justify-between"> 
      <a href={url} target="_blank" rel="noopener noreferrer" className="block text-2xl font-semibold text-blue-600 hover:underline">
        {name}
      </a>
      <div className="mt-2 text-gray-400">
        <p>Host: {host}</p>
        <p>Registration: {formatDate(registerationStartTimeUnix)} - {formatDate(registerationEndTimeUnix)}</p> 
      </div>
    </div>
  );
};
export default HackathonCard