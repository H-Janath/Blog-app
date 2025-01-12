import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashProfile from "../componenet/DashProfile";
import DashSidebar from "../componenet/DashSidebar";
import DashPost from "../componenet/DashPost";
import DashUser from "../componenet/DashUser";
export default function Dashboard() {

  const location = useLocation();
  const [tab,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div  className="md:w-56 ">
          <DashSidebar/>
      </div>
         {tab==='profile'  && <DashProfile/>}
         {tab==='posts' && <DashPost/>}
         {tab==='users' && <DashUser/>}
    </div>
  )
}
