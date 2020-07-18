import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from '@material-ui/core'
import Rate from '../Rate/Rate';
import FormElement from '../UI/Form/FormElement';
import { createReview } from '../../store/actions/reviewsActions';
import { kindOfRating } from '../../constants';

const useStyles = makeStyles({
  hide: {
    display: "none",
  },
  open: {
    display: 'flex',
    textAlign: 'center'
  }
});

const ReviewForm = ({placeId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    comment: '',
    qualityOfFood: 0,
    serviceQuality: 0,
    interior: 0
  });

  const [open, setOpen] = useState(false)

  const inputChangeHandler = (event) => {
    setState({...state,
      [event.target.name]: event.target.name === 'comment' ? event.target.value : parseInt(event.target.value),
    });
  };

  const closeHandler = () => {
    setOpen(false);
    setState({...state, comment: '', qualityOfFood: 0, serviceQuality: 0, interior: 0});
  }

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const data = {...state};
    data.place = placeId;
    await dispatch(createReview(data));
    closeHandler();
  }

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction='column' spacing={3} style={{marginTop: open? 15: -12}}>
        <Grid item container xs style={{paddingBottom: 0}} className={open ? classes.open: classes.hide}>
          {kindOfRating.map(el => (
            <Rate key={el} setScore={inputChangeHandler} name={el} value={parseInt(state[el])}/>
          ))}
        </Grid>
        <Grid item xs onClick={() => setOpen(true)}>
          <FormElement
            type="text"
            propertyName="comment"
            multiline
            placeholder="Leave a comment"
            onChange={inputChangeHandler}
            value={state.comment}
          />
        </Grid>
        <Grid item container xs justify='flex-end' style={{paddingTop: 0}} className={open ? classes.open: classes.hide}>
          <Button onClick={closeHandler} variant='text'>Cancel</Button>
          <Button type='submit' color="primary" variant="contained" style={{marginLeft: 10}}>Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ReviewForm
