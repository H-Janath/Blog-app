import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, 
  updateSuccess, 
  updateStart,
  deleteUserFailure,
  deleteUserStart,
  delteUserSuccess 
} from '../redux/User/UserSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashProfile() {
  const [imageFileuploading, setImageFileuploading] = useState(false);
  const { currentUser,error } = useSelector(state => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [upadteUserSuccess, setUpadteUserSuccess] = useState(null);
  const dispatch = useDispatch();
  const [updateUsererror, setUpdateUsererror] = useState(null);


  const handleDeeteUser= async()=>{
    setShowModel(false);
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(deleteUserFailure(data.message));
        }else{
          dispatch(delteUserSuccess (data));
        }
    }catch(error){
        dispatch(deleteUserFailure(error.message));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUsererror(null);
    setUpadteUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUsererror('No changes made');
      return;
    }
    if (imageFileuploading) {
      setUpdateUsererror("Please wait for image to upload");
      return;
    }
    try {
      console.log("Janath");
      dispatch(updateStart());
      console.log(formData);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUsererror(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpadteUserSuccess("User's profile update successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      updateUsererror(error.message);
    }
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile])
  const uploadImage = async () => {


    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //     	allow write: if 
    //       request.resource.size< 2*1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileuploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progres =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progres.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileuploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL })
          setImageFileuploading(false);
        });
      }
    );
  };

  return (

    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profle</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}>
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={
              `${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                }
              }}
            />

          )
          }
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] 
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60 '}`} />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}


        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='example@gmail.com' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>

      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => { setShowModel(true) }} className='cursor-pointer'>Delete account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {upadteUserSuccess && (
        <Alert color='success' className='mt-5'>
          {upadteUserSuccess}
        </Alert>)}
      {updateUsererror && (
        <Alert color='failure' className='mt-5'>
          {updateUsererror}
        </Alert>)}
        {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>)}

      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md' >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you wnat to delete your account?</h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeeteUser}>Yes, I'm sure</Button>
              <Button color='gray'  onClick={()=>setShowModel(false)}>No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}
