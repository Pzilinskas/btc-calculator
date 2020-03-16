import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import CurrencyField from './components/currencyField/currencyField';
import CurrencyDropdown from "./components/currencyDropdown/currencyDropdown";
import useInterval from './utils';

import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function App() {
  const [currentPrice, setCurrentPrice] = useState();
  const [visibleCurrencies, setVisibleCurrencies] = useState(['EUR', 'GBP', 'USD' ]);
  const [amountToConvert, setAmountToConvert] = useState();
  const [conversion, setConversion] = useState();
  const [hasError, setErrors] = useState(false);
  const classes = useStyles();
  const availableCurrencies = ['EUR', 'GBP', 'USD'].filter(x => !visibleCurrencies.includes(x));

  async function fetchBtc() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    res
        .json()
        .then(res =>  setCurrentPrice(res.bpi))
        .catch(err => setErrors(err));
  }

  function calculateConversion (amount) {
    let calculation = [];
    Object.entries(currentPrice).forEach(([currency, val]) => {
     const calculatedValue = val.rate_float * amount;
       calculation.push({
         label: val.code,
         amount: new Intl.NumberFormat(undefined, {style: 'currency', currency: val.code}).format(calculatedValue),
       });
      setConversion(calculation);
    });
  }

  useEffect(() => {
    fetchBtc();
      }, []
  );

  useInterval(() => {
    if(amountToConvert){
      fetchBtc().then(() => {
        calculateConversion(amountToConvert)
      });
    }
  }, 1000 * 60);

  function handleSelectChange(event) {
    setVisibleCurrencies([...visibleCurrencies, event.target.value]);
  }

  function removeCurrency(currency) {
    setVisibleCurrencies(visibleCurrencies.filter(item => item !== currency));
  }

  function handleSubmit(event) {
      event.preventDefault();
      setAmountToConvert(event.target.amount.value);
      calculateConversion(event.target.amount.value);
  }

  const currencyFields =  conversion && conversion.filter(({ label }) =>
        visibleCurrencies.includes(label)).map((values, index) => {
         return (<Grid item xs={12} md={4} justify="center" alignItems="center" spacing={2}>
          <CurrencyField key={index} amount={amountToConvert} btcConversion={values}
                         onClickShowCurrency={removeCurrency}/>
        </Grid>)
      }
   );

  return (
      <Grid container className={classes.root} spacing={2} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BTC Calculator
            </Typography>
          </Toolbar>
        </AppBar>
          <Grid item xs={12} >
            <Grid container justify="center" alignItems="center" spacing={2}>
              <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Enter amount"
                    name="amount"
                    autoFocus
                    type="number"
                />
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
              </form>
            </Grid>
          </Grid>
          {availableCurrencies.length > 0 &&
          <Grid item xs={12} >
            <Grid spacing={2}>
              <CurrencyDropdown currentCurrencies={availableCurrencies} handleChange={handleSelectChange}/>
            </Grid>
          </Grid>
          }
          {currencyFields}
      </Grid>
  );
}
