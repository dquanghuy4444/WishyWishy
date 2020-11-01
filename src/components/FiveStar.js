import React from 'react';
import { Button } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

function FiveStar({numStar , onClickSetNumStar , isDisabled = false}) {

    const onClickSetStar = (num) =>{
        onClickSetNumStar(num);
    }

    const showStar = () =>{
        let result= [];
        for(let index = 0 ; index < 5 ; index++){
            result.push(
                <Button  key={ index } disabled={ isDisabled } onClick={() => onClickSetStar(index + 1) } style={{ color : "#3f51b5" , minWidth : "3.4rem"  }}>
                    { index < numStar ? <StarIcon></StarIcon> : <StarBorderIcon></StarBorderIcon>}
                </Button>
            );
        }
        return result;
    }

    return (
        <div >
            { showStar() }
        </div>
    );
}

export default FiveStar;
