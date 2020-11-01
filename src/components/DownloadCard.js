import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonExportCSV from './ButtonExportCSV';
import GetAppIcon from '@material-ui/icons/GetApp';
import ButtonExportJSON from './ButtonExportJSON';

export default function DownloadCard({data , headers , filename , text , isCsvFile = true}) {
  const paper = (<Paper elevation={3} style={{ height : "100%" , textDecoration : 'none'}}>
                  <Card variant="outlined">
                      <CardContent style={{ height : "100%" , background : isCsvFile ? "rgb(206 133 133)" : "rgb(134 209 89)" , color : "aliceblue" }}>
                        <Typography variant="h6" component="h6">
                          <GetAppIcon></GetAppIcon>
                          <span>
                            { text }
                          </span>    
                        </Typography>
                      </CardContent>
                  </Card>
                </Paper>);
  if(isCsvFile){
    return (
      <ButtonExportCSV data={ data } headers={ headers } filename={ filename }>
        { paper }
      </ButtonExportCSV>
    );
  }


  return (
    <ButtonExportJSON data={ data }>
      { paper }
    </ButtonExportJSON>

  );
}
