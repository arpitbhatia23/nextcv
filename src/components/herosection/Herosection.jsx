import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

function Herosection() {
    const card_detail = [
        {
            number: "1K+",
            title: "Resumes Created",
        },
        {
            number: "95%",
            title: "Success Rate",
        },
        {
            number: "2 Min",
            title: "Average Time",
        },
        {
            number: "₹100",
            title: "Fixed Price",

        }
    ]
    
    return (
        <>

        <section className='m-0 p-0 container mx-auto py-24 px-4 grid sm:grid-cols-2 justify-items-center items-center gap-8  lg:gap-12 bg-blue-500'>
            <div>
                <div className='flex flex-col gap 6 max-w-xl'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold gap-4 '>
                        Build Your Perfect Resume with AI – In Minutes
                    </h1>
                    <h2 className='text-xl sm:text-2xl md:text-3xl mt-3 '>AI-powered. Pay only ₹100 per resume. No subscriptions</h2>

                </div>

 <div className='flex justify-center items-center gap-4 mt-4'>
                    <Button className="text-lg px-6 py-8  text-blue-600 bg-white hover:text-blue-600 hover:bg-white ">
                        Create Your Resume
                    </Button>
                    <Button className="text-lg px-6 py-8 text-white bg-blue-600  border-2 border-blue-600 hover:bg-white  hover:text-blue-600">
                        View Templates
                    </Button> 
 </div>
                <div className='flex flex-wrap gap-6 mt-4 mx-8 sm:gap-8'>
                    <h1 className= "bg-transparent text-gray-300 text-lg ">
                    ⚡
                    AI-Powered
                    </h1>
                    <h1 className= "bg-transparent text-gray-300 text-lg ">
                        🎯
                        ATS-Optimized

                    </h1>
                    <h1 className= "bg-transparent text-gray-300  text-lg">
                    💰
                    Just ₹100
                    </h1></div>
              
            </div>
            <div>
                <div className='flex gap-4 my-4 justify-center items-center p-8 sm:p-0 w-full md:p-0 md:w-full'>
                    <div >
                        <img src="https://images.unsplash.com/photo-1549923746-9507eec27243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cmVzdW1lJTI1MjB3b3Jrc3BhY2UlMjUyMG1vZGVybiUyNTIwYnJpZ2h0JTI1MjBpbGx1c3RyYXRpb258ZW58MXwwfHx8MTc0OTM5NTIwM3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="" className='rounded-2xl ' /> 
                    </div>
                   
</div>
            </div>
           

        </section>
            <div className='flex  justify-center items-center gap-16  mt-0
        p-0 sm:grid-cols-4 bg-blue-500'>
                {card_detail.map(({ number, title }, index) => (
                    <Card key={index}
                        className="border-none shadow-none bg-transparent  px-4
    ">
                        <CardContent>
                            <CardTitle className="text-3xl font-bold text-white ">{number}</CardTitle>
                            <CardDescription className="text-xl text-white ">{title}</CardDescription>
                        </CardContent>

                    </Card>
                ))}
            </div>
        </>
        
)}


export default Herosection
