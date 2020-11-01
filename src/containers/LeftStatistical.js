import React from 'react';
import PieChart from '../components/PieChart';
import DataCard from '../components/DataCard';
import { Grid } from '@material-ui/core';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import StarIcon from '@material-ui/icons/Star';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

function LeftStatistical({averageRating, amountWishes , amountFemale , amountMale , amountOthers}){

    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                    <DataCard text={ "Số lượng điều ước đã được tạo ra " } num={ amountWishes } icon={ <FilterDramaIcon></FilterDramaIcon> }></DataCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DataCard text={ "Số điểm hài lòng của người dùng" } num={ averageRating } is5star={ true } icon={ <StarIcon></StarIcon> }></DataCard>
                </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={2} style={{ border : "2px solid #3f51b5" , borderRadius : "0.6rem" , padding : "1rem 0"}}>
                <Grid item xs={12} sm={4}>
                    <DataCard text={ "Số lượng nữ giới tham gia" } num={ amountFemale } icon={ <PeopleOutlineIcon></PeopleOutlineIcon> }></DataCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataCard text={ "Số lượng nam giới tham gia" } num={ amountMale } icon={ <PeopleOutlineIcon></PeopleOutlineIcon> }></DataCard>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataCard text={ "Số lượng khác giới tham gia" } num={ amountOthers } icon={ <AccessibilityNewIcon></AccessibilityNewIcon> }></DataCard>
                </Grid>

                <PieChart amountFemale={ amountFemale } amountMale={ amountMale } amountOthers={ amountOthers }></PieChart>
            </Grid>
        </>
    );
}

export default LeftStatistical;
