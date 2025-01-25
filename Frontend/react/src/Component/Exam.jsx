import React, { useState } from 'react';
import '../App.css';
import HallTicket from './HallTicket';

const Exam = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Reg_No: '',
        Department: '',
        Year: '',
        DOB: '',
        Place: '',
    });
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [showHallTicket, setShowHallTicket] = useState(false);

    const url = 'https://mini-amjp.onrender.com/register';
    const uploadUrl = 'https://mini-amjp.onrender.com/upload';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const upload = async () => {
        try {
            if (photo) {
                const formData = new FormData();
                formData.append('photo', photo);

                const photoResponse = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData
                });

                if (!photoResponse.ok) {
                    throw new Error(`Photo upload failed: ${photoResponse.statusText}`);
                }

                const photoData = await photoResponse.json();
                console.log("Photo upload response:", photoData);

                if (photoData && photoData.file && photoData.file.filename) {
                    setPhotoURL(`/uploads/${photoData.file.filename}`);
                } else {
                    throw new Error('Photo data structure is invalid, missing file.path');
                }
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, photoURL })
            });

            if (!response.ok) {
                throw new Error(`Form data upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            if (data) {
                console.log('Data uploaded successfully');
            } else {
                console.log("Data not found");
            }
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        await upload();
        setShowHallTicket(true);
    };

    return (
        <div className='bk'>
            <div className='container flex flex-col justify-center items-center min-h-screen mx-auto'>
                {showHallTicket ? (
                    <HallTicket {...formData} photoURL={photoURL} />
                ) : (
                    <form className='glassmorphism flex flex-col md:flex-col justify-center items-center space-y-5 p-20' onSubmit={onSubmit}>
                        <h1 className='mb-10 text-2xl text-white'>Exam Registration</h1>
                        <input
                            type="text"
                            name="Name"
                            placeholder='Enter the Name'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.Name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="Reg_No"
                            placeholder='Enter the Reg'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.Reg_No}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="Department"
                            placeholder='Enter the Department'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.Department}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="Year"
                            placeholder='Enter the Year'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.Year}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="DOB"
                            placeholder='Enter the DOB'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.DOB}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="Place"
                            placeholder='Enter the Place'
                            className='shadow shadow-black px-10 py-3 rounded-[40px]'
                            value={formData.Place}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            name="photo"
                            className="custom-photo-upload modern-style shadow shadow-black px-10 py-3"
                            onChange={handlePhotoChange}
                        />

                        <button type="submit" className='px-10 py-3 bg-blue-500 text-white rounded-[40px]'>Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Exam;
