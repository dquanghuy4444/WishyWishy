import React, { useRef } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

function SearchTextField({onSearch}) {
  const typingTimeoutRef = useRef(null);

  const onChangeWordSearch = (e) =>{
    if(!onSearch) return;
    const value = e.target.value;

    if(typingTimeoutRef.current){
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() =>{
      onSearch(value);
    },5e2);
  }

  return (
      <FormControl variant="outlined" style={{ float : "right" }}>
        <InputLabel>Tìm kiếm</InputLabel>
        <OutlinedInput
          type={"text"}           
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
              >
                <SearchIcon></SearchIcon>
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
          onChange={ onChangeWordSearch }
        />
        <FormHelperText>
          { "Nên tìm theo tag của điều ước hoặc tên của tác giả" }
        </FormHelperText>
      </FormControl>
  );
}

export default SearchTextField;
