import React from "react";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Divider, Box, Paper } from "@material-ui/core";
import {deleteReview} from '../../store/actions/reviewsActions';
import { labels, kindOfRating } from "../../constants";
import ShowTo from "../../hoc/ShowTo";
import { useDispatch } from "react-redux";

const Review = ({ props, placeId }) => {
  const date = moment(props.createdAt).calendar();
  const dispatch=useDispatch();
  return (
    <Paper elevation={2}>
      <Box p={4} my={2}>
        <Grid item container direction="column" xs>
          <Grid item container xs justify="space-between">
            <b>{props.user.username}</b>
            <small>{date}</small>
          </Grid>
          <Grid item xs>
            <Divider light />
          </Grid>
          <Grid item xs>
            <Box py={2}>{props.comment}</Box>
          </Grid>
          {kindOfRating.map((el) => (
            <Grid item container xs={12} sm={10} md={6} lg={5} key={el}>
              <Grid item xs={4}>
                <span style={{ textTransform: "capitalize" }}>
                  {el.replace(/([A-Z])/g, " $1")}:{" "}
                </span>
              </Grid>
              <Grid item container xs={8}>
                <Rating readOnly value={parseInt(props[el])} />
                <Box ml={4}>{labels[parseInt(props[el])]}</Box>
              </Grid>
            </Grid>
          ))}
          <Grid item xs>
            <Divider style={{ margin: "10px 0 15px" }} />
          </Grid>
            <ShowTo role='admin' reviewUserId={props.user._id}>
              <Grid item container justify='flex-end'>
                <Button
                  size='small'
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => dispatch(deleteReview(props._id, placeId))}
                >
                  Delete
                </Button>
              </Grid>
            </ShowTo>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Review;
