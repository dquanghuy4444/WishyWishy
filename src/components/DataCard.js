import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  number: {
    fontWeight: "500",
    fontSize: "1.3rem",
    float : "right"
  }
});

export default function DataCard({text , num , icon , is5star}) {
  const classes = useStyles();

  return (
    <Paper elevation={3} style={{ height : "100%"}}>
      <Card variant="outlined" style={{ height : "100%"}}>
        <CardContent style={{ height : "100%"}}>
          <Typography variant="h6" component="h4">
            { text }
          </Typography>
          {/* <ButtonExportCSV></ButtonExportCSV> */}
          <br />
          <div style={{ color : "#3f51b5" }}>
            { icon }
            <span className={classes.number}>
              { is5star ? num > 0 ? (<span>{ num } / 5</span>) : (<span>Null</span>) :
                <CountUp end={ num }></CountUp>
              }
            </span>
          </div>
        </CardContent>
      </Card>
    </Paper>

  );
}
