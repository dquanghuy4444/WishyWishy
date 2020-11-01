import React from 'react';
import List from '@material-ui/core/List';
import FaceIcon from '@material-ui/icons/Face';
import FacebookIcon from '@material-ui/icons/Facebook';
import WcIcon from '@material-ui/icons/Wc';
import { Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import * as Enum from '../constants/Enum';
import ListItemFormDetail from './ListItemFormDetail';

function FormDetail({wish}) {

    const showSex = () =>{
        var result = Enum.TEXT_SEX.OTHERS;
        const sex = parseInt(wish.author_sex);
        switch (sex) {
            case Enum.STATE_SEX.FEMALE:
                result = Enum.TEXT_SEX.FEMALE;
                break;

            case Enum.STATE_SEX.MALE:
                result = Enum.TEXT_SEX.MALE;
                break;
            default:
                break;
        }
        return result;
    }

    return (
        <List component="nav" aria-label="main mailbox folders">
            <ListItemFormDetail icon={ <FaceIcon /> } text={ wish.author_name }></ListItemFormDetail>

            <ListItemFormDetail icon={ <WcIcon /> } text={ showSex() }></ListItemFormDetail>

            <ListItemFormDetail icon={ <FacebookIcon /> } text={ wish.author_fb }></ListItemFormDetail>
            
            <Divider></Divider>

            <Container style={{ width : "500px" }}>
                <ListItemFormDetail icon={ <FormatColorTextIcon /> } text={ "Nội dung" }></ListItemFormDetail>

                <div style={{ whiteSpace : "pre-line" , fontSize : "1.3rem" , fontWeight : "500" }}>
                    { wish.description }
                </div>

                <ListItemFormDetail icon={ <LabelImportantIcon /> } text={ wish.tag }></ListItemFormDetail>

            </Container>


        </List>
    );
}

export default FormDetail;
