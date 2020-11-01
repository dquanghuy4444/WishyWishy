import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

function NoData({text , hasAddButton = true}) {

    return (
        <>
            <h2 style={{ textAlign : "center" , fontWeight : "600" }}>
                { text }
            </h2>
            <div style={{ display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                { hasAddButton && (
                    <Link to="/create" style={{ textDecoration : "none" }}>
                        <Button variant="contained" color="primary">
                            <AddIcon></AddIcon>
                            Tạo mới
                        </Button>
                    </Link>
                )}
            </div>
            <div style={{ display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                <img src={ process.env.PUBLIC_URL + "/pngwave.png" } width={"40%"} alt="Hihi"></img>
            </div>
        </>
    );
}

export default NoData;
