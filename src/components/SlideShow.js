import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper } from '@material-ui/core'
import FiveStar from './FiveStar';

export default function SlideShow({ feedback })
{
    const showPaper = () =>{
        let result = feedback.map((item, i) => { 
            if(item.text !== ""){
                return (
                    <Paper key={ i } elevation={3} style={{ width : "100%" }}>
                        <FiveStar numStar={ item.num_star } isDisabled={ true }></FiveStar>
                        <h3 style={{ whiteSpace : "pre-line" , margin : "1.2rem 1rem 0" }}>{ item.text }</h3>
                    </Paper>
                );
            }
        })
        return result.filter(Boolean);
    }

    if(feedback && feedback.length > 0){
        return (
            <>
                <h3 style={{ textAlign : "center" , fontWeight : "500" , margin : "0" }}> 
                    Những phản hồi của người dùng
                </h3>
                <Carousel animation="slide" interval={8e3} timeout={8e2} autoPlay={false} indicators={false}>
                    {
                        showPaper()
                    }
                </Carousel>
            </>
        )
    }
    return <></>;

}
 
// function Item(props)
// {
//     return (
//     )
// }