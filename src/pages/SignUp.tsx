import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { authInstance } from '@/api/axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!usernamePattern.test(username)) {
            newErrors.username = 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores.';
        }

        if (!emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!passwordPattern.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileRead = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            console.log(arrayBuffer); // This is the file buffer (ArrayBuffer)
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('userName', username);
        formData.append('loginId', email);
        formData.append('password', password);

        if (file) {
            formData.append('profilePic', file);
            handleFileRead(file); // Read and log the file buffer
        }

        console.log(file);

        try {
            const response = await authInstance.post('user/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-6 bg-white rounded-md shadow-md'>
                <h2 className='mb-4 text-2xl font-semibold'>Register</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className='mb-4'>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username *</label>
                        <Input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete='off'
                            autoFocus
                        />
                        {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
                        <Input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                    </div>
                    <div className='mb-6 relative'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <div className='flex align-middle justify-center bg-white border border-gray-300 px-2'>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='pr-12 border-none'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeNoneIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                                ) : (
                                    <EyeOpenIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                    </div>
                    <div className='mb-6 relative'>
                        <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <div className='flex align-middle justify-center bg-white border border-gray-300 px-2'>
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id='confirmpassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className='pr-12 border-none'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeNoneIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                                ) : (
                                    <EyeOpenIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='profilepic' className='block text-sm font-medium text-gray-700'>Profile Pic</label>
                        <Input
                            type='file'
                            id='profilepic'
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setFile(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <Button type='submit' variant='secondary'>
                        Sign Up
                    </Button>
                </form>
                <Link to='/login'>
                    <p className='text-primary underline'>Already have an account? Login</p>
                </Link>
                <Toaster />
            </div>
        </div>
    );
};

export default SignUp;
