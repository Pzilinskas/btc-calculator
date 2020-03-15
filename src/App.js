import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import CurrencyField from './components/currencyField/currencyField';
import CurrencyDropdown from "./components/currencyDropdown/currencyDropdown";

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
  const [showCurrency, setShowCurrency] = useState(true);
  const [currentConversion, setCurrentConversion] = useState([]);
  const [visibleCurrencies, setVisibleCurrencies] = useState(['EUR', 'GBP', 'USD']);
  const [conversion, setConversion] = useState();
  const [hasError, setErrors] = useState(false);
  const classes = useStyles();



  async function fetchBtc() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    res
        .json()
        .then(res => setCurrentConversion([res.bpi]))
        .catch(err => setErrors(err));
  }

  function calculateConversion () {

  }

  useEffect(() => {
    fetchBtc();

      }, []
  );
  //console.log(currentConversion);
  //console.log(conversion)
  calculateConversion();

  function handleSubmit(e) {
      e.preventDefault();
      console.log('submit');
  }



  return (
      <Grid container className={classes.root} spacing={2} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              BTC Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container >
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <form>
                <div>
                  <FormControl>
                    <InputLabel htmlFor="my-input">Enter amount</InputLabel>
                    <Input id="amount"  name="amount" type="number" label="Enter number"   />
                  </FormControl>
                  <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <CurrencyDropdown currencies={visibleCurrencies} />
          </Grid>
          <Grid container spacing={2}>
            {visibleCurrencies.map((currency, index) =>
              <Grid item xs={12} md={12} justify="center" alignItems="center" spacing={2}>
              <CurrencyField currencyLabel={currency} key={index} showCurrency={showCurrency} onClickShowCurrency={setShowCurrency} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Grid>
  );
}
