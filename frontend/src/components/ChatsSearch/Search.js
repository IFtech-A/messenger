import { SearchOutlined } from '@mui/icons-material'
import { InputBase } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => {
    return {
        searchBar: {
            border: '1px solid',
            borderColor: theme.palette.text.secondary,
            borderRadius: '20px',
            padding: '5px',
            backgroundColor: theme.palette.grey[300]
        }
    }
})


const Search = () => {

    const classes = useStyles();
    const [query, setQuery] = useState('')

    const onChangeSearchQuery = (e) => {
        setQuery(e.currentTarget.value)
        console.log(query)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 4px' }}>
            
            <InputBase
                className={classes.searchBar}
                value={query}
                onChange={onChangeSearchQuery}
                aria-label="Message search"
                placeholder="Search messages..."
                fullWidth
                startAdornment={
                    <SearchOutlined />
                } />

        </div>
    )
}

export default Search
