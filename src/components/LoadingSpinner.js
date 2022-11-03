import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center loading-spinner-container'>
      <Spinner className='loading-spinner' animation="border" role="status" variant='primary'></Spinner>
    </div>
  );
}

export { LoadingSpinner };
