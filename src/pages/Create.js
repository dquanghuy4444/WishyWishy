import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom';
import * as Enum from './../constants/Enum.js';
import * as Str from './../constants/String.js';
import { createWish } from './../api/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { showSuccessMessage , showWarnMessage } from './../functions/ShowMessage';
import { fetchSettingData  } from './../api/index';
import NoData from "./../components/NoData";

function Create({history}) {
  const [allowCreate , SetAllowCreate] = useState(true);
  const [authorSex , setAuthorSex] = useState(Enum.STATE_SEX.MALE);
  const [authorFb , setAuthorFb] = useState('');
  const [authorName , setAuthorName] = useState({
    text : '',
    errText : "",
    err : false,
  });
  const [wishTag , setWishTag] = useState({
    text : '',
    errText : "",
    err : false,
  });
  const [wishDescription , setWishDescription] = useState({
    text : '',
    errText : "",
    err : false,
  });

  useEffect(() => {

    const fetchData = async () =>{
      let data = await fetchSettingData();
      data && SetAllowCreate(data.allow_create_new);
    }

    fetchData();
    return () => {
    }
  }, [])

  const onHandleChangeSex = (e) =>{
    setAuthorSex(parseInt(e.target.value));
  }

  const onHandleChangeAuthorName = (e) =>{
    setAuthorName({err : false , errText : "", text : e.target.value});
  }

  const onHandleChangeWishDescription = (e) =>{
    setWishDescription({err : false , errText : "", text : e.target.value});
  }

  const onHandleChangeWishTag = (e) =>{
    setWishTag({err : false , errText : "", text : e.target.value});
  }
  
  const onHandleChangeAuthorFb = (e) =>{
    setAuthorFb(e.target.value);
  }

  const onCreateWish = async (e) =>{
    e.preventDefault();

    var isErr = false;

    if(authorName.text === ""){
      setAuthorName({...authorName , err : true , errText : Str.TEXT_ERROR_NULL});
      isErr = true;
    }
    if(wishDescription.text === ""){
      setWishDescription({...wishDescription , err : true , errText : Str.TEXT_ERROR_NULL});
      isErr = true;
    }
    if(wishTag.text === ""){
      setWishTag({...wishTag , err : true , errText : Str.TEXT_ERROR_NULL});
      isErr = true;
    }
    else if(/\s/.test(wishTag.text)){
      setWishTag({...wishTag , err : true , errText : Str.TEXT_ERROR_STR_HAVE_WHITESPACE});
      isErr = true;
    }


    if(!isErr){
      const isSuccess = await createWish({
        description :wishDescription.text,
        tag: wishTag.text,
        author_name: authorName.text,
        author_sex: authorSex,
        author_fb: authorFb,
      });
      if(isSuccess){
        showSuccessMessage(Str.TEXT_MESSAGE_CREATE_SUCCESS);   
        history.push("/");
      } else {
        showWarnMessage(Str.TEXT_MESSAGE_CREATE_FAIL);
      }
    }
  }

  const mainComp = (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <form onSubmit={ onCreateWish }>
            <TextField
              label="Tên tác giả"
              variant="outlined"
              value={ authorName.text }
              fullWidth
              error={ authorName.err }
              helperText={ authorName.errText }
              onChange={ onHandleChangeAuthorName }
            />
            <br></br>
            <br></br>
            <FormControl component="fieldset">
              <FormLabel component="legend">Giới tính</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel value={ Enum.STATE_SEX.MALE } checked={ authorSex === Enum.STATE_SEX.MALE } onChange={ onHandleChangeSex } control={<Radio color="primary" />} label="Nam" />
                <FormControlLabel value={ Enum.STATE_SEX.FEMALE } checked={ authorSex === Enum.STATE_SEX.FEMALE } onChange={ onHandleChangeSex } control={<Radio color="primary" />} label="Nữ" />
                <FormControlLabel value={ Enum.STATE_SEX.OTHERS } checked={ authorSex === Enum.STATE_SEX.OTHERS } onChange={ onHandleChangeSex } control={<Radio color="primary" />} label="Khác" />
              </RadioGroup>
            </FormControl>
            <br></br>
            <br></br>
            <TextField
              label="Facebook"
              helperText="Có thể nhập hoặc không.Nếu nhập có nhập tên fb ,link fb hoăc id fb (nên nhập link fb)"
              variant="outlined"
              value={ authorFb }
              fullWidth
              onChange={ onHandleChangeAuthorFb }
            />
            <br></br>
            <br></br>
            <TextField
              label="Nội dung"
              multiline
              rows={4}
              variant="outlined"
              value={ wishDescription.text }
              fullWidth
              error={ wishDescription.err }
              helperText={ wishDescription.errText }
              onChange={ onHandleChangeWishDescription }
            />
            <br></br>
            <br></br>
            <TextField
              label="Tag"
              variant="outlined"
              value={ wishTag.text }
              fullWidth
              error={ wishTag.err }
              helperText={ wishTag.err ? wishTag.errText : "Viết liền không sử dụng dấu cách" }
              onChange={ onHandleChangeWishTag }
            />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type="submit">
              <AddIcon></AddIcon>
              Tạo mới
            </Button>
            <Link to="/" style={{ textDecoration : "none" }}>
              <Button variant="outlined" style={{ marginLeft : "1rem" }} color="secondary">
                Quay lại
              </Button>
            </Link>
          </form>   
        </Grid>
        <Grid item xs={12} sm={3}>
          <img src={ process.env.PUBLIC_URL + "/pngwave.png" } width={"82%"} alt="Hihi"></img>
        </Grid>
    </Grid>
  )

  return (
    allowCreate ? mainComp : <NoData text={ "Hiện tại hệ thống chưa cho phép tạo mới điều ước" } hasAddButton={ false }></NoData>
  );
}

export default Create;
