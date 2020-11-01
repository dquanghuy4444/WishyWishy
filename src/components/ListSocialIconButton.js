import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';

function ListSocialIconButton() {

    const listYoutube = ["ZiNwcnIpvdg" , "xN_fYh3Wq9Q" , "PQsJaAgLkAk" , "6-V1K6PMSc4" , "o-YFuyI5kUw" ];

    return (
        <>
            <IconButton href={ "https://www.youtube.com/watch?v=" +  listYoutube[Math.floor(Math.random() * listYoutube.length)] } target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <YouTubeIcon></YouTubeIcon>
            </IconButton>
            <IconButton href="https://www.facebook.com/dqhuy4444" target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <FacebookIcon></FacebookIcon>
            </IconButton>
            <IconButton href="https://www.instagram.com/dquanghuy4444/" target="_blank" color="inherit" style={{ color : "#3f51b5" }}>
                <InstagramIcon></InstagramIcon>
            </IconButton>
        </>
    );
    }

export default ListSocialIconButton;
