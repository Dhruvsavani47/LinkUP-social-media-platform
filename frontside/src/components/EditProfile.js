import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { FaCamera } from "react-icons/fa";
import "../styles/EditProfile.css"
import { checkImage } from '../utils/imageUpload';
import { updateProfile } from '../redux/actions/profileActions';

const EditProfile = ({ user, setOnEdit }) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const initState = {
        website: '', fullname: '', story: '', phone: '', address: ''
    }
    const [editData, setEditData] = useState(initState);
    const { website, fullname, story, phone, address } = editData;
    const [avatar, setAvatar] = useState('');

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) {
            return dispatch({
                type: 'ALERT',
                payload: {
                    error: err
                }
            })
        }
        setAvatar(file);
    }

    useEffect(() => {
        setEditData(user);
    }, [user])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }

    const selectUpload = () => {
        const fileUploadInput = document.getElementById("file-upload");
        fileUploadInput.click();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateProfile({ editData, avatar, auth }))
        setOnEdit(false);
    }

    return (
        <div className='editprofile'>
            <div className="editprofile-content">
                <div className="editprofile-head">
                    <h4 className="editprofile-headtitle">
                        Edit Your Profile
                    </h4>

                    <button className='editprofile-headclose' onClick={() => setOnEdit(false)}>&times;</button>
                    <hr className="my-4 border-gray-900" />
                </div>

                <div className="editprofile-avatar">
                    <Avatar src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="" />
                    <FaCamera size={35} color="black" className='editprofile-avatarcamera' onClick={selectUpload} />
                    <span>
                        <input type="file" id="file-upload" accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="editprofile-userdata">
                    <div className='editprofile-userdatafullname'>
                        <label htmlFor="fullname">Fullname </label>
                        <input type="text" value={fullname} onChange={handleChangeInput} name='fullname' placeholder='Type your name' />
                        {/* <small>{fullname.length}/25</small> */}
                    </div>

                    <div className='editprofile-userdataaddress'>
                        <label htmlFor="address">Address </label>
                        <input type="text" value={address} onChange={handleChangeInput} name='address' placeholder='Type your address' />
                    </div>

                    <div className='editprofile-userdatawebsite'>
                        <label htmlFor="website">Website </label>
                        <input type="text" value={website} onChange={handleChangeInput} name='website' placeholder='Type your website name' />
                    </div>

                    <div className='editprofile-userdataphone'>
                        <label htmlFor="phone">Phone </label>
                        <input type="text" value={phone} onChange={handleChangeInput} name='phone' placeholder='Type your phone number' />
                    </div>

                    <div className='editprofile-userdatastory'>
                        <label htmlFor="story">Story </label>
                        <input type="text" value={story} onChange={handleChangeInput} name='story' placeholder='Type your Bio' />
                    </div>

                    <button type='submit' onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
                </div>
            </div>
        </div>

    )
}

export default EditProfile;


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Avatar from '@mui/material/Avatar';
// import "../styles/EditProfile.css"

// const EditProfile = ({ user, setOnEdit }) => {
//     const { auth } = useSelector((state) => state);
//     const initState = {
//         website: '', fullname: '', story: '', phone: '', address: '',
//     };
//     const [editData, setEditData] = useState(initState);
//     const { website, fullname, story, phone, address } = editData;
//     const [avatar, setAvatar] = useState('');

//     const changeAvatar = (e) => {
//         const file = e.target.files[0];
//         if (file) setAvatar(file);
//     };

//     const handleChangeInput = (e) => {
//         const { name, value } = e.target;
//         setEditData({ ...editData, [name]: value });
//     };

//     return (
//         <div className="flex flex-col w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center pb-4 border-b">
//                 <h4 className="text-lg font-semibold">Edit Your Profile</h4>
//                 <button
//                     className="text-red-500 hover:text-red-800"
//                     onClick={() => setOnEdit(false)}
//                 >
//                     &times;
//                 </button>
//             </div>

//             <div className="flex flex-col items-center my-6">
//                 <Avatar
//                     src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
//                     alt="Avatar"
//                     className="w-24 h-24"
//                 />
//                 <label
//                     htmlFor="file-upload"
//                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
//                 >
//                     Upload New Avatar
//                 </label>
//                 <input
//                     type="file"
//                     id="file-upload"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={changeAvatar}
//                 />
//             </div>

//             <div className="space-y-4">
//                 <div className="flex space-x-5">
//                     <label htmlFor="fullname" className="text-sm font-medium content-center">
//                         Fullname :
//                     </label>
//                     <input
//                         type="text"
//                         id="fullname"
//                         name="fullname"
//                         value={fullname}
//                         onChange={handleChangeInput}
//                         placeholder="Type your name"
//                         className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-9/12"
//                     />
//                 </div>

//                 <div className="flex space-x-5">
//                     <label htmlFor="address" className="text-sm font-medium content-center">
//                         Address :
//                     </label>
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         value={address}
//                         onChange={handleChangeInput}
//                         placeholder="Type your address"
//                         className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-9/12"
//                     />
//                 </div>

//                 <div className="flex space-x-5">
//                     <label htmlFor="website" className="text-sm font-medium content-center">
//                         Website :
//                     </label>
//                     <input
//                         type="text"
//                         id="website"
//                         name="website"
//                         value={website}
//                         onChange={handleChangeInput}
//                         placeholder="Type your website name"
//                         className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-9/12"
//                     />
//                 </div>

//                 <div className="flex space-x-5">
//                     <label htmlFor="phone" className="text-sm font-medium content-center">
//                         Phone :
//                     </label>
//                     <input
//                         type="text"
//                         id="phone"
//                         name="phone"
//                         value={phone}
//                         onChange={handleChangeInput}
//                         placeholder="Type your phone number"
//                         className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-9/12"
//                     />
//                 </div>

//                 <div className="flex space-x-5">
//                     <label htmlFor="story" className="text-sm font-medium content-center">
//                         Story :
//                     </label>
//                     <textarea
//                         id="story"
//                         name="story"
//                         value={story}
//                         onChange={handleChangeInput}
//                         placeholder="Type your bio"
//                         rows="3"
//                         className="mt-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-9/12"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProfile;
