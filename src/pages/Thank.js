import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import FiveStar from '../components/FiveStar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { showWarnMessage , showSuccessMessage } from './../functions/ShowMessage';
import { createFeedback } from './../api/index';
import * as Str from './../constants/String';

function Thank() {

  const [numStar , setNumStar] = useState(0);
  const [feedback , setFeedback] = useState('');

  const onClickSetNumStar = (numStar) =>{
    setNumStar(numStar);
  }

  const onChangeFeedback = (e) =>{
    setFeedback(e.target.value);
  }

  const onClickSendFeedback = async () =>{
    if(numStar === 0){
      showWarnMessage(Str.TEXT_MESSAGE_NUMSTAR_NULL);
    }else {
      const isSuccess = await createFeedback({
        text : feedback,
        num_star : numStar,
      });
      if(isSuccess){
        setTimeout(() => {
          setNumStar(0);
          setFeedback('');
        }, 5e2);
  
        showSuccessMessage(Str.TEXT_MESSAGE_FEEDBACK_SUCCESS);
      } else {
        showWarnMessage(Str.TEXT_MESSAGE_CREATE_RESPONSE_FAIL)
      }

    }
  }

  return (
    <Grid
      container
      spacing={3}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <h4>
          Cảm ơn bạn rất nhiều vì đã trải nghiệm website của chúng tôi
          <br></br>
          Nếu có điều gì không vừa ý bạn hay xảy ra lỗi gì , hãy phản hồi tại đây .
          Mọi ý kiến của bạn , chúng tôi luôn lắng nghe và đừng quên đánh giá chất lượng website nhé ^^ .
          <br></br>
          Chúc bạn một ngày tốt đẹp 
        </h4>
        <div>
          <span>Đánh giá</span>
          <FiveStar onClickSetNumStar={ onClickSetNumStar } numStar={ numStar }></FiveStar>
        </div>
        <br></br>
        <TextField
          label="Nội dung phản hồi"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          value={ feedback }
          onChange={ onChangeFeedback }
        />
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" type="submit" onClick={ onClickSendFeedback }>
          <CloudUploadIcon></CloudUploadIcon>
          Gửi phản hồi
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* <img src={ process.env.PUBLIC_URL + "/81e0536435229f93-.gif" } width={"100%"} alt="Hihi"></img> */}
        <img src={ process.env.PUBLIC_URL + "/5ae.jpg" } width={"100%"} alt="Hihi" className="text-center"></img>
      </Grid>
    </Grid>
  );
}

export default Thank;
