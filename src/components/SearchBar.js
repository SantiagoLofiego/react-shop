import React from 'react'

const SearchBar = ({ searchValue, setSearchValue }) => {

    const onSeachValueChange = (event) => {
        setSearchValue(event.target.value);
    }

  return (
    <div>
        <div className="searchBar">
            <input type='text' placeholder='Buscar productos' onChange={onSeachValueChange} />
        </div>
    </div>
  )
}

export default SearchBar
