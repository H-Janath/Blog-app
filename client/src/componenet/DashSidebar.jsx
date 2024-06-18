import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {signoutSuccess} from '../redux/User/UserSlice'
import { useDispatch, useSelector } from 'react-redux';
export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const handleSignout = async()=>{
        try{
          const res = await fetch('/api/user/signout',{
            method:'POST'
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }else{
            dispatch(signoutSuccess());
          }
        }catch(error){
    
        }
      }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab')
        if (tabFormUrl) {
            setTab(tabFormUrl);
        }
    }, [location.search]);
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile' id='1'>
                    <Sidebar.Item 
                        active={tab === 'profile'} 
                        icon={HiUser} 
                        label={"User"} 
                        labelColor='dark'
                        as='div'
                        >
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item 
                        onClick={handleSignout}
                        icon={HiArrowSmRight} 
                        className="cursor-pointer">
                        Sing out
                    </Sidebar.Item>
                    
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
