import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MenuBookIcon from '@material-ui/icons/MenuBook';

function ListSocialIconButton() {

    const listYoutube = ["ZiNwcnIpvdg" , "xN_fYh3Wq9Q" , "6-V1K6PMSc4" , "o-YFuyI5kUw" ];

    return (
        <>
            <IconButton href={ "https://www.youtube.com/watch?v=" +  listYoutube[Math.floor(Math.random() * listYoutube.length)] } target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <YouTubeIcon></YouTubeIcon>
            </IconButton>
            <IconButton href="https://www.facebook.com/dqhuy4444" target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <FacebookIcon></FacebookIcon>
            </IconButton>
            <IconButton href="https://tiki.vn/tuoi-tre-dang-gia-bao-nhieu-tai-ban-p7718733.html?spid=7718734&utm_source=google&utm_medium=cpc&utm_campaign=SEA_NBR_GGL_DSA_DAP_ALL_VN_ALL_UNK_UNK_C.ALL_X.10197030421_Y.100628603263_Q.b_K._W.DT_R.438928999165_L.NU_O.CIR&gclid=Cj0KCQjwufn8BRCwARIsAKzP696sy0I1v2cZirQeWNpOG0tVFgU1jaHc572fmlbZ3637ArjbOb8za_oaAryrEALw_wcB" target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <MenuBookIcon></MenuBookIcon>
            </IconButton>
        </>
    );
    }

export default ListSocialIconButton;
