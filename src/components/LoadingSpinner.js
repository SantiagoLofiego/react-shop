import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center loadingSpinner'>
      <Spinner animation="border" role="status" variant='primary'></Spinner>
    </div>
  );
}

export { LoadingSpinner };
