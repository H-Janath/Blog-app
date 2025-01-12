import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Table,Modal,Button } from 'flowbite-react';
import { HiOutlineExclamationCircle }  from 'react-icons/hi';
import {FaTimes,FaCheck} from 'react-icons/fa'
 
export default function DashUser() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModel,setShowModel] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState('');

  const handleDeleteUser  = async ()=>{
    try{
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=> prev.filter((user)=>user._id != userIdToDelete ));
        setShowModel(false);
      }else{
        console.log(data.message);
      }
    }catch(error){
      console.log(error.massage);
    }
  }
  const handleShowMore = async ()=>{
    const startindex = users.length;
    try{
      const res = await fetch(`/api/user/getusers?startIndex=${startindex}`);
        const data  = await res.json();
        if(res.ok){
          setUsers((prev)=>[...prev,...data.users]);
          if(data.users.length<9){
            setShowMore(false)
          }
        }
    }catch(error){

    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getUsers`)
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if(data.users.length<9){
            setShowMore(false);
          }

        }
      } catch (error) {
        console.log(error.massage);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id])


  return (
    <div className='table-auto overflow-x-scroll 
                    md:mx-auto p-3 scrollbar 
                    scrollbar-track-slate-100 
                    scrollbar-thum-slate-300 
                    dark:scrollbar-track-salte-700 
                    dark:scrollbar-track-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell> Date created </Table.HeadCell>
              <Table.HeadCell> User image </Table.HeadCell>
              <Table.HeadCell> User name </Table.HeadCell>
              <Table.HeadCell> Email </Table.HeadCell>
              <Table.HeadCell> Admin </Table.HeadCell>
              <Table.HeadCell> Delete </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover rounded-full bg-gray-500'
                      />
                  </Table.Cell>
                  <Table.Cell>
                  {user.username}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin?(<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}
                  </Table.Cell>
                  <Table.Cell>
                      <span onClick={()=>{
                          setShowModel(true);
                          setUserIdToDelete(user._id)
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete
                      </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-300 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no users yet</p>
      )}
    
       <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you wnat to delete this post?</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser} >Yes, I'm sure</Button>
              <Button color='gray' onClick={() => setShowModel(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
