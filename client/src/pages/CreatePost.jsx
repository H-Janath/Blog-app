import React, { useState } from 'react'
import {TextInput,FileInput, Button, Alert} from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import JoditEditor from 'jodit-react';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist';
import {useNavigate} from 'react-router-dom';

export default function CreatePost() {

  const navigat = useNavigate();
  const [file,setFile] = useState(null);
  const [formdata,setFormData] = useState({});
  const [imageUploadProgress,setImageUploadProgress] = useState(null);
  const [imageUploadError,setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
 
  const handleUploadImage = async () =>{
      try{
          if(!file){
            setImageUploadError("Please select an image");
            return;
          }
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime()+ "-"+file.name;
          const storageRef = ref(storage,fileName);
          const uploadTask = uploadBytesResumable(storageRef,file);
          uploadTask.on(
            'state_changed',
            (snapshort)=>{
              const progress =
                (!snapshort.bytesTransferred / snapshort.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
            },
            (error)=>{
              setImageUploadError("Something went wrong");
              setImageUploadProgress(null);
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({...formdata,image: downloadURL});
              });
            }
          );
      }catch(error){
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
        console.log(error);
      }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/post/create',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message);
        return
      }
      if(data.success == false){
        setPublishError(data.message);
        return;
      }
      if(res.ok){
        setPublishError(null);
        navigat(`/post/${data.slug}`);
      }
    }catch(error){
        setPublishError('Something went wrong');
        
    }
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1'
          onChange={(e)=>
            setFormData({...formdata,title: e.target.value})
          }
          />
          <select
            onChange={(e)=>
              setFormData({...formdata, category: e.target.value})
            }
          >
            <option value='uncategorized' >Select a category</option>
            <option value='javascript'>Java script</option>
            <option value='reactjs'>React.js</option>
            <option>Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput 
            type='file' 
            accept='image/*'
            typeof='file'
            onChange={(e)=> setFile(e.target.files[0])}
            />
          <Button 
          type='button' 
          gradientDuoTone='purpleToBlue' 
          size='sm' 
          outline
          onClick={handleUploadImage}
          disabled={imageUploadProgress}
          >
            {imageUploadProgress?(
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress||0}%`}/>

              </div>
            ):(
              'Upload Image'
            )
            }
          </Button>
        </div>
        {imageUploadError && 
        <Alert color='failure'>
          {imageUploadError}
        </Alert>}
        {formdata.image &&(
          <img 
          src={formdata.image}
          alt='upload'
          className='w-full h-72 object-cover'
          />
        )}
        <JoditEditor
        onChange={(value)=>{
          setFormData({...formdata, content: value});
        }

        }
        />
        <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
        {
          publishError && <Alert color='failure' className='mt-5'>{publishError}</Alert>
        }
      </form>
    </div>
  )
}
