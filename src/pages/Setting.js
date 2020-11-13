import React, { useEffect, useState } from 'react';
import { fetchSettingData , updateSetting } from './../api/index';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import * as Str from './../constants/String.js';
import { showSuccessMessage , showWarnMessage } from './../functions/ShowMessage';

function Setting() {
  const [setting , setSetting] = useState({
    amount_w_in_page : 3,
    top_wishes : 10,
    allow_download : true,
    allow_create_new : true,
  });

  useEffect(() => {
    const fetchData = async () =>{
      let isMounted = true;
      const data = await fetchSettingData();

      (data && isMounted) && setSetting({
        amount_w_in_page : data.amount_w_in_page,
        top_wishes : data.top_wishes,
        allow_download : data.allow_download,
        allow_create_new : data.allow_create_new,
      });
    }
    
    fetchData();

    return () =>{
      isMounted = false;
    }
  },[])

  const onHandleChangeAllowDownload = (e) =>{
    console.log(e.target.value)
    setSetting({...setting , allow_download : JSON.parse(e.target.value) });
  }

  const onHandleChangeAllowCreateNew = (e) =>{
    console.log(e.target.value)
    setSetting({...setting , allow_create_new : JSON.parse(e.target.value) });
  }

  const onHandleChangeAmountW = (event, newValue) =>{
    setSetting({...setting , amount_w_in_page : newValue });
  }

  const onHandleChangeTopWishes = (event, newValue) =>{
    setSetting({...setting , top_wishes : newValue });
  }

  const onChangeSetting = async (e) =>{
    e.preventDefault();

    const isSuccess = await updateSetting(setting);
    if(isSuccess){
      showSuccessMessage(Str.TEXT_MESSAGE_UPDATE_SETTING_SUCCESS);   
    } else {
      showWarnMessage(Str.TEXT_MESSAGE_UPDATE_SETTING_FAIL);
    }
  }

  return (
    <>
      <form onSubmit={ onChangeSetting }>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cho phép tạo mới điều ước</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel value={ true } checked={ setting.allow_create_new === true } onChange={ onHandleChangeAllowCreateNew } control={<Radio color="primary" />} label="Có" />
            <FormControlLabel value={ false } checked={ setting.allow_create_new === false } onChange={ onHandleChangeAllowCreateNew } control={<Radio color="primary" />} label="Không" />       
          </RadioGroup>
        </FormControl>
        <br></br>
        <br></br>
        <Typography>
          Số lượng điều ước trong 1 lần tải
        </Typography>
        <Slider
          value={ setting.amount_w_in_page }
          aria-labelledby="discrete-slider"
          step={1}
          marks
          min={3}
          max={ 10 }
          onChange={ onHandleChangeAmountW }
          valueLabelDisplay="auto"
          // style={{ width : "70%" }}
        />
        <br></br>
        <br></br>
        <FormControl component="fieldset">
          <FormLabel component="legend">Cho phép download file ở trang thống kê</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel value={ true } checked={ setting.allow_download === true } onChange={ onHandleChangeAllowDownload } control={<Radio color="primary" />} label="Có" />
            <FormControlLabel value={ false } checked={ setting.allow_download === false } onChange={ onHandleChangeAllowDownload } control={<Radio color="primary" />} label="Không" />       
          </RadioGroup>
        </FormControl>
        <br></br>
        <br></br>
        <Typography>
          Số top những tác giả có lượng yêu thích nhiều nhất ở trang thống kê
        </Typography>
        <Slider
          value={ setting.top_wishes}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={3}
          max={10}
          onChange={ onHandleChangeTopWishes }
          // style={{ width : "70%" }}
        />
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" type="submit">
          <BeenhereIcon></BeenhereIcon>
          Thay đổi
        </Button>
      </form>
    </>
  );
}

export default Setting;
