import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField(props) {
  const inputE1 = useRef("");

  const searchHandler = () => {
    props.setSearchTerm(inputE1.current.value);
    console.log("!!!", props.searchTerm);
      if(props.searchTerm) {
        const filteredResult = props.state.filter((project) => {
          return Object.values(project)
            .join(" ")
            .toLowerCase()
            .includes(props.searchTerm.toLowerCase());
        });
        props.setProjects(filteredResult);
      } else {
        props.setProjects(props.state);
      }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="input-with-sx" 
        label={props.label}
        variant="outlined"
        inputRef={inputE1}
        value={props.searchTerm} 
        onChange={searchHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );

}
