import React from 'react';

import classes from './Button.css';

const button = (props) => (
  <button
    disabled={props.disabled} 
    className={[classes.Button, classes[props.btnType]].join(' ')} //像是訪問object[key]?
    onClick={props.clicked}>{props.children}</button>
)

export default button;