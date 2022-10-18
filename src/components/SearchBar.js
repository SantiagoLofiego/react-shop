import React from 'react'
import { InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';


const SearchBar = ({ searchValue, setSearchValue }) => {

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div>
      <InputGroup className="mb-3 container">
        <Form.Control
          placeholder="Buscar productos..."
          onChange={onSearchValueChange}
        />
        <InputGroup.Text id="basic-addon2" className='bg-light'>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>
    </div>
  )
}

export default SearchBar
