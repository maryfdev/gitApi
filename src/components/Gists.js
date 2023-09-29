import React, { useState } from 'react'
import classes from './Gists.module.css'

const Gists = (props) => {

  const[isVisible,setIsVisible]= useState(true);

  const imgClickHandler = () =>{
    setIsVisible(!isVisible);
  }

  const fileObj = Object.values(props.files); //Object.values create an array of values of an object
  // regardless of the keys

  return (
    <li key={props.id} className={classes.liClass}>
      <img 
           src={props.url} 
           alt="avatar" 
           className={isVisible ? classes['fade-in'] : classes['fade-out9']}
           onClick={imgClickHandler}
      />
      {
        <h3>{fileObj[0].filename}</h3>
      }
    </li>
  )
}

export default Gists