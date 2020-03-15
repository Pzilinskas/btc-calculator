import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

export default function CurrencyDropdown(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleToggle() {
        setOpen(!open);
    }


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Select Currency</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleToggle}
                    onOpen={handleToggle}
                    onChange={props.handleChange}
                >
                    {props.currentCurrencies.map((currency, index) =>
                        <MenuItem key={index} value={currency}>{currency}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}
