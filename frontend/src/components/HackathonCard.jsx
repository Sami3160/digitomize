const HackathonCard = ({ hackathon }) => {
  const { name, host, url, registerationEndTimeUnix, registerationStartTimeUnix } = hackathon;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-[#121616] rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.1)] p-5 mb-6 min-h-52 border border-cyan-500/40 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-2xl font-bold text-cyan-400 hover:underline hover:tracking-wide transition-all duration-200"
    >
      {name}
    </a>
  
    <div className="mt-4 text-sm text-gray-300 space-y-1">
      <p><span className="text-gray-400">Host:</span> {host}</p>
      <p>
        <span className="text-gray-400">Registration:</span>{" "}
        {formatDate(registerationStartTimeUnix)} &ndash; {formatDate(registerationEndTimeUnix)}
      </p>
    </div>
  </div>
  
  );
};
export default HackathonCard