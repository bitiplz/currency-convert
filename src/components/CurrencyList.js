import React from 'react';
import '../app.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80px',
    width: '100%',
  },
  select: {
    margin: 0,
  },
}));

function CurrencyList( props ) {
  const classes = useStyles();

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select className={classes.select} value={ props.selected } onChange={ props.onSelect }>
            { props.data.map( opt => (<MenuItem key={opt} value={opt}>{opt}</MenuItem>) ) }
        </Select>
      </FormControl>
    </div>
  );
}

export default CurrencyList;