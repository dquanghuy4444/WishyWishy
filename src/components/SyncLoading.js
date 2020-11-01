import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import Grid from '@material-ui/core/Grid';
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 1rem auto;
  border-color: red;
`;

function SyncLoading() {
  return (
    <Grid container spacing={1}>
        <SyncLoader 
        css={override}              
        size={15}
        color={"#3f51b5"}
        loading={true}
        />
    </Grid>
  );
}

export default SyncLoading;
