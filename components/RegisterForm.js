'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// RegisterForm.js
import { useState } from 'react';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
        if ( !formData.name || !formData.email || !formData.password ) {
            alert("All field are mendatery !")

        }
        try {
            const userExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  
                    email: formData.email,
                    
                })
            });
        
            const { user } = await userExists.json();

            if (user) {
                alert('user already exists.');

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                });

                return;
                
            }

            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (res) {
                // alert('user fill form successfully !');
                router.push('/');
            }

        } catch (error) {
            console.log('error in post data', error);
        }

       
        setFormData({
            name: '',
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-44 border border-gray-950 rounded-lg p-12">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-gray-500 text-white p-2 block rounded mb-4 hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
            >
                Sign Up
            </button>

            <Link href='/login' className='pt-7  ' > have an account? <span className='underline text-red-600'>login</span> </Link>

        </form>
    );
};

export default RegisterForm;
