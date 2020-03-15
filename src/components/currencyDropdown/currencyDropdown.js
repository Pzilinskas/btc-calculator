import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

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
    const [currency, setCurrency] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = event => {
        setCurrency(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Select Currency</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={currency}
                    onChange={handleChange}
                >
                    {props.currencies.map((currency, index) =>
                        <MenuItem value={currency}>{currency}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    );
}
