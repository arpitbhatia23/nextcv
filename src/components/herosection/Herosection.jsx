import React from 'react'
import { Button } from '../ui/button'

function Herosection() {
    return (
        <section className='container mx-auto py-24 px-4 grid sm:grid-cols-2 justify-items-center items-center gap-8 lg:gap-12'>
            <div>
                <div className='flex flex-col gap 6 max-w-xl'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold gap-4 '>
                        Create your resume in <span className='text-purple-600'>seconds</span>
                    </h1>
                    <h2 className='text-xl sm:text-2xl md:text-3xl mt-3 '>AI-powered. Pay only ₹100 per resume. No subscriptions</h2>

                </div>

                <div className='flex flex-wrap gap-4 mt-4 mx-8 sm:gap-8'>
                    <Button className= "bg-transparent text-gray-500 text-lg ">
                        ✓ No money fees
                    </Button>
                    <Button className= "bg-transparent text-gray-500 text-lg ">
                        ✓ ATS-Friendly
                    </Button>
                    <Button className= "bg-transparent text-gray-500  text-lg">
                        ✓ 60 Seconds
                    </Button></div>
                <div><Button className="bg-teal-800 text-white text-2xl px-8 py-8 mt-8">
                    Sign in with Google to Get Started
                </Button></div>
            </div>
            <div>
                <div className='flex gap-4 my-4'>
                    <div >
                        <img src="https://images.unsplash.com/photo-1549923746-9507eec27243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cmVzdW1lJTI1MjB3b3Jrc3BhY2UlMjUyMG1vZGVybiUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTM5NTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="" className='rounded-2xl' /> 
                    </div>
                   
</div>
            </div>

        </section>
    )
}

export default Herosection
