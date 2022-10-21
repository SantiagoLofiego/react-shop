import React from 'react';
import { FaUser } from 'react-icons/fa';

const Profile = ({ user }) => {
  return (
    <div className=' m-5'>
      <div className='profile-pic'>
        {user.photoURL
          ? <img src={user.photoURL} alt="" />
          : <div className='rounded-circle bg-dark profile-default-pic'>
            <FaUser />
          </div>
        }
        <h1 className='h1'>{user.displayName}</h1>
        <h3 className='h3'>{user.email}</h3>
        <h3 className='h3'>{user.phone}</h3>

      </div>
    </div>
  );
}

export default Profile;
