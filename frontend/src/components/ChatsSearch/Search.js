import { SearchOutlined } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { borderRadius } from '@mui/system'
import React, { useState } from 'react'
import CustomInput from '../InputField/InputField'

const Search = () => {
    const [query, setQuery] = useState('')

    const onChangeSearchQuery = (e) => {
        setQuery(e.currentTarget.value)
        console.log(query)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 4px' }}>
            {/* <TextField
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
            /> */}
            <InputAdornment sx={{mr: '5px'}}><SearchOutlined /></InputAdornment>
            <div style={{ width: '-webkit-fill-available' }}>
                <CustomInput
                    value={query}
                    onChange={onChangeSearchQuery}
                    aria-label="Message search"
                    placeholder="Search messages..."
                />
            </div>

        </div>
    )
}

export default Search
