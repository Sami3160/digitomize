import  { useEffect, useState } from 'react'
import {  useLocation, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CompanyProblems from './CompanyProblems'
export default function ProblemsPage() {
    const [selectedCompany, setSelectedCompany] = useState()
    const [searchParams] = useSearchParams()
    const location = useLocation();
    useEffect(()=>{
        document.title = "Digitomize | Problems"
    },[])
    useEffect(() => {
        const company = searchParams.get('company')
        if (company) {
            setSelectedCompany(company)
        }
        // console.log(location)
    }, [location.search, searchParams])

const companies = [
  { name: "Google", icon: "https://img.icons8.com/color/48/google-logo.png" },
  { name: "Flipkart", icon: "https://static.vecteezy.com/system/resources/thumbnails/049/401/761/small/flipkart-icon-transparent-background-free-png.png" },
  { name: "Uber", icon: "https://img.icons8.com/ios-filled/50/ffffff/uber.png" },
  { name: "Amazon", icon: "https://img.icons8.com/ios-filled/50/ffffff/amazon.png" },
  { name: "Apple", icon: "https://img.icons8.com/ios-filled/50/ffffff/mac-os.png" },
  { name: "Pinterest", icon: "https://img.icons8.com/color/48/pinterest--v1.png" },
  { name: "Meta", icon: "https://img.icons8.com/fluency/48/meta.png" },
  { name: "Oracle", icon: "https://img.icons8.com/ios-filled/50/ffffff/oracle-logo.png" },
  { name: "IBM", icon: "https://img.icons8.com/ios-filled/50/ffffff/ibm.png" },
  { name: "Stripe", icon: "https://img.icons8.com/ios-filled/50/ffffff/stripe.png" },
  { name: "TCS", icon: "https://marvel-b1-cdn.bc0a.com/f00000000004333/www.zuora.com/wp-content/uploads/2024/03/tcs-p-c.png" },
  { name: "Adobe", icon: "https://static.cdnlogo.com/logos/a/90/adobe.png" },
  { name: "Nvidia", icon: "https://img.icons8.com/ios-filled/50/73b300/nvidia.png" },
  { name: "Snapchat", icon: "https://static.vecteezy.com/system/resources/previews/018/930/694/non_2x/snapchat-logo-snapchat-icon-transparent-free-png.png" },
  { name: "Leap Motion", icon: "https://logowik.com/content/uploads/images/leap-motion4851.logowik.com.webp" }
];

    return (
        <>
        
   <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center my-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Top Companies</h2>
        <p className="mt-4 text-xl text-gray-400">And their frequently asked questions</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-items-center">
        {companies.map((company, idx) => {
          const paramCompany = searchParams.get('company');
          const companySlug = company.name.toLowerCase().replace(/\s/g, "-");
          const isActive = paramCompany === companySlug;
          return (
            <Link
              key={idx}
              to={`/problems?company=${companySlug}`}
              className={`w-full flex justify-center items-center gap-3 text-white font-medium py-3 px-4 rounded-xl transition duration-200 border border-white/10 bg-[#1ADCD5]/10 hover:bg-[#1ADCD5]/30 backdrop-blur-md ${
                isActive ? 'ring-2 ring-[#1ADCD5] border-[#1ADCD5] bg-[#1ADCD5]/30' : ''
              }`}
            >
              <img src={company.icon} alt={company.name} className="w-6 h-6 object-contain" />
              <span className="truncate text-base">{company.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-16">
        {selectedCompany && (
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Frequently asked problems from <span className="text-[#1ADCD5]">{selectedCompany.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </h3>
        )}
        <CompanyProblems />
      </div>
   
    </div>
 
    </>
  );
}
