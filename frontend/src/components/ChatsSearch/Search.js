import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const Search = () => {
    const [query, setQuery] = useState('')

    const onChangeSearchQuery = (e) => {
        setQuery(e.currentTarget.value)
        console.log(query)
    }
    return (
        <div style={{
        }}>
            <TextField
                variant="outlined"
                sx={{
                    m: '5px auto',
                    width: '95%',
                }}
                value={query}
                onChange={onChangeSearchQuery}
                placeholder='Search Messenger'
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <SearchOutlined />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default Search
