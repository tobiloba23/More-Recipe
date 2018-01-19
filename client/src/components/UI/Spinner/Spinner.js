import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => {
    return <div className={props.gold ? classes.LoaderGold : classes.Loader}>Loading...</div>;
}

export default spinner;