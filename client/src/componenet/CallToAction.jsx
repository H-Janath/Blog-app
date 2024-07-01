import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col '>
            <h2 className='text-2xl'>
              Want to lern more about Java script?
            </h2>
            <p className='text-gray-500 my-2'>
              Checkout these resourses with 100 Java script project
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
              <a href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer'>
              100 Javascript Projects</a>
            </Button>
        </div>
        <div className="p-7 flex-1">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/JavaScript_code.png" alt="" />

        </div>
    </div>
  )
}
