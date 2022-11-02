import React, { useState } from 'react';
import { FaUser, FaCamera, FaEdit } from 'react-icons/fa';
import { useRef } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { uploadFile } from '../firebase/firebaseStorage';

const Profile = ({ userState, updateUser }) => {
  const inputFile = useRef();
  const formData = useRef();
  const [uploading, setUploading] = useState(false);
  const [edit, setEdit] = useState('anim-editForm-start');
  const { user, checking } = userState;

  const handleUpload = (e) => {
    setUploading(true)
    const file = e.target.files[0];
    uploadFile('photo.jpg', file, user)
      .then((response) => {
        updateUser({ photoURL: response.url })
        setUploading(false);
      }
      )

  }
  const handleUploadBtn = () => {
    inputFile.current.click();
  }

  const handleEdit = () => {
    if(edit === 'anim-editForm-start'){
      setEdit('anim-editForm-end')
    }else{
      setEdit('anim-editForm-start')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataEntries = new FormData(formData.current);
    const data = {
      displayName: dataEntries.get('displayName'),
      phone: dataEntries.get('phone'),
      address: dataEntries.get('address'),
      city: dataEntries.get('city')
    }
    updateUser(data);
  }

  return (
    <div className=' mt-5 d-flex flex-wrap'>
      <div className='profile-pic me-5'>
        {user.photoURL
          ? <img src={user.photoURL} alt="" />
          : <div className='rounded-circle bg-dark profile-default-pic'>
            <FaUser />
          </div>
        }
        <div id='photo-upload-btn' onClick={handleUploadBtn}>
          {uploading ? <Spinner animation="grow" variant="light" /> : <FaCamera />}
        </div>
      </div>
      <div className='profile-data p-2 text-start'>
        <h1 className='h1'>{user.displayName}</h1>
        <h3 className='h3'>Email: {user.email}</h3>
        <h3 className='h3'>Telefono: {user.phone}</h3>
        <h3 className='h3'>Dirección: {user.address}</h3>
        <h3 className='h3'>Ciudad: {user.city}</h3>
        <input hidden={true} ref={inputFile} type="file" name="photo" id="photo" title='subir foto' onChange={handleUpload} />
        <div className='edit-btn' onClick={handleEdit}><FaEdit /></div>
      </div>
      <div className={`profile-form flex-grow-1 ${edit}`}>
        <form ref={formData} className='text-start'>
          <div className="form-group m-3">
            <label>Nombre</label>
            <input type="text" name="displayName" className="form-control m-1 " key={user.displayName} defaultValue={user.displayName} />
          </div>
          <div className="form-group m-3">
            <label>Telefono</label>
            <input type="text" name="phone" className="form-control m-1" key={user.phone} defaultValue={user.phone} />
          </div>
          <div className="form-group m-3">
            <label>Dirección</label>
            <input type="text" name="address" className="form-control m-1" key={user.address} defaultValue={user.address} />
          </div>
          <div className="form-group m-3">
            <label>Ciudad</label>
            <input type="text" name="city" className="form-control m-1" key={user.city} defaultValue={user.city} />
          </div>
          {checking ? <Button variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            Procesando
          </Button>
            : <button onClick={handleSubmit} className="btn btn-primary ms-4">Actualizar</button>}   
        </form>
      </div>
    </div>
  );
}

export default Profile;
