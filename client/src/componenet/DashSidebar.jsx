import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/User/UserSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function DashSidebar() {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {

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
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile' id='1'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin?'Admin':'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
    
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts' id='2'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>)}
            {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users' id='2'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>)}

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
