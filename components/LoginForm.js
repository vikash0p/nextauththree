'use client'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// LoginForm.js
import { useState } from 'react';


const LoginForm = () => {
    const [formData, setFormData] = useState({
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
        if (!formData.email || !formData.password) {
            alert("All field are mendatery !");
            return;

        }

        try {

            const res = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });
            if (res.error) {
                alert('Invalid credentials');
                return
            }

        } catch (error) {
            console.log(error)
        }

        router.replace("/dashboard");
        setFormData({

            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-44 border border-gray-950 rounded-lg p-12">

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
                className="bg-gray-500 text-white p-2 mb-4 rounded block hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"
            >
                Log In
            </button>

            <Link href='/signup' className='pt-7  ' >{`Don\'t have an account?`} <span className='underline text-red-600'>Register</span> </Link>
        </form>
    );
};

export default LoginForm;
