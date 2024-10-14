import { cn } from "../utils/cn";
import { Redirect } from 'react-router-dom';

const ContestCard = ({ key, title, description, header, icon, className, startTime, duration }) => {

   return (
      <BentoGridItem
         key={key}
         title={title}
         description={description}
         header={header}
         icon={icon}
         className={className}
         startTime={startTime}
         duration={duration}
      />
   )
}

export const Skeleton = () => (
   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export const BentoGrid = ({
   className,
   children,
}) => {
   return (
      <div
         className={cn(
            "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
            className
         )}
      >
         {children}
      </div>
   );
};

export const BentoGridItem = ({
   key,
   className,
   title,
   header,
   icon,
   startTime,
   duration
}) => {

   const [selectedContestId, setSelectedContestId] = useState(null);

   const handleContestClick = (contestId) => {
      setSelectedContestId(contestId);
   };

   // Redirect to the selected contest page if a contest is selected
   if (selectedContestId) {
      // https://codeforces.com/contests/2030
      return <Redirect to={`/contest/${selectedContestId}`} />;
   }
   return (
      <div
         className={cn(
            "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
            className
         )}
      >
         {header}
         <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col items-center justify-center relative">
            <div className="text-white w-full absolute top-2 left-0">Start Time:{new Date(startTime * 1000).toLocaleString()}</div>
            <div className="absolute top-2 right-2">
               {icon}
            </div>
            <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-2xl">
               {title}
            </div>
            <div className="text-white absolute bottom-0 left-2">
               Duration: {duration} Hours
            </div>
            <div className="absolute bottom-0 right-2 cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right md:w-10 md:h-10" style={{ color: "white" }}><path d="M18 8L22 12L18 16"></path><path d="M2 12H22"></path></svg>
            </div>
         </div>
      </div>
   );
};


export default ContestCard