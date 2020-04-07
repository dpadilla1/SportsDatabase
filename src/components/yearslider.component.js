import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([2015, 2019]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setYears();
  };

  const setYears = () => {
      props.setYears(value)
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Select Year Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        step={1}
        min={2015}
        max={2019}
        marks={[
          {
            value: 2015,
            label: '2015',
          },
          {
            value: 2016,
            label: '2016',
          },
          {
            value: 2017,
            label: '2017',
          },
          {
            value: 2018,
            label: '2018',
          },
          {
            value: 2019,
            label: '2019',
          },
        ]}
      />
    </div>
  );
}
