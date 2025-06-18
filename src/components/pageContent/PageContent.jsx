'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const PageContent = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (count < 100) {
            const timer = setTimeout(() => {
                setCount(prev => prev + 1);
            }, 30);
            return () => clearTimeout(timer);
        }
    }, [count]);

    const card_detail =[
        {
            icon:"⚡",
            title:"Smart AI Resume Generator",
            description:"Our advanced AI analyzes your information and creates professional resumes tailored to your industry."
        },
        {
            icon: "🧠",
            title:"ATS-Optimized Templates",
            description: "Beat applicant tracking systems with our carefully designed templates that pass ATS filters."
        },
        {
            icon: "💸",
            title: "Just ₹100 per Resume",
            description:"Affordable pricing that won't break the bank. Get professional results at a fraction of the cost."
        },
        { icon: "🎓",
            title:"Made for Students & Job Seekers",
            description:"Whether you're a fresh graduate or experienced professional, we have templates for everyone."
        }
    ]

    return (
        <section className=''>
            <Card className="items-center shadow-none border-none ">
                <h1 className='text-4xl font-bold'>{count}%</h1>
                <p className='text-xl text-gray-800'>Experience the future of resume building with our AI-powered platform designed for modern job seekers.</p>
            </Card>

            <Card className="grid grid-cols-4 mx-8 shadow-none border-none ">
                {card_detail.map(({icon,title,description},index)=>(
                    <Card key={index}
                    className="max-w-3/4">
                        <CardContent>
                            <CardHeader className="text-4xl p-2 mx-12">{icon}</CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardContent>
                        </Card>
                ))}
            </Card>
        </section>
)
};

export default PageContent;
