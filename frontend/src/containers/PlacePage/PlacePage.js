import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router'
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Photos from "../../components/Photos/Photos";
import FormElement from "../../components/UI/Form/FormElement";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import Review from "../../components/Review/Review";
import { fetchPlace } from "../../store/actions/placesActions";
import { addPhoto, fetchPhotos } from "../../store/actions/photosActions";
import { apiURL, labels } from "../../constants";

const useStyles = makeStyles({
  hide: {
    display: "none",
  },
  open: {
    display: 'flex',
    paddingTop: 12
  }
});

const PlacePage = ({match}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const user = useSelector(state => state.users.user);
  const place = useSelector(state => state.places.place);
  const photos = useSelector(state => state.photos.photos);
  const picture = apiURL + "/" + place.image;
  const overall = place.totalScores&&Object.keys(place.totalScores).reduce((acc, curr) => (acc + Math.round(place.totalScores[curr]/place.reviews.length)/3),0);
  const check = place.reviews&&place.reviews.find(el => (user&&user._id === el.user._id));
  const uploadPhotoHandler = () => {
    const formData = new FormData();
    Object.keys(image).forEach((key) => {
      formData.append(key, image[key]);
    });
    formData.append('place', match.params.id);
    dispatch(addPhoto(formData, match.params.id));
    setOpen(false);
  };

  useEffect (() => {
    dispatch(fetchPlace(match.params.id));
    dispatch(fetchPhotos(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Grid item container direction="column" xs={12} lg={8} style={{ margin: "auto" }}>
      <Paper elevation={2} style={{ margin: "16px 0", padding: 20, width: '100%' }}>
        <Grid item container direction="row" spacing={2} wrap="wrap-reverse">
          <Grid item xs={12} md={7}>
            <Paper elevation={3} style={{ padding: "5px" }}>
              <CardMedia
                component="img"
                image={place.image && picture}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography component="h4" variant="h4" style={{textTransform: 'capitalize'}}>
              {place.title}
            </Typography>
            <Typography component="p" variant="subtitle1">
              {place.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography component="h5" variant="overline">
            Ratings:
          </Typography>
          <Grid item container direction='column' style={{ marginBottom: "8px" }}>
            <Grid item container xs={12} sm={10} md={6} lg={5}>
              <Grid item xs={4}>
                <span>Overall: </span>
              </Grid>
              <Grid item container xs={8}>
                <Rating readOnly value={Math.round(overall)}/>
                <Box id='overall' ml={4}>{labels[Math.round(overall)]}</Box>
              </Grid>
            </Grid>
            {place.totalScores&&Object.keys(place.totalScores).map(el => (
              <Grid item container xs={12} sm={10} md={6} lg={5} key={el}>
                <Grid item xs={4}>
                  <span style={{textTransform:'capitalize'}}>{el.replace(/([A-Z])/g, ' $1')}: </span>
                </Grid>
                <Grid item container xs={8}>
                  <Rating readOnly value={Math.round(place.totalScores[el] / place.reviews.length)}/>
                  <Box ml={4}>{labels[Math.round(place.totalScores[el] / place.reviews.length)]}</Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography component="h5" display="inline" variant="overline">
            Gallery:
          </Typography>
          <Grid container direction='column'>
            <Grid item xs>
              {photos.length> 0 ? (
                <Photos photos={photos} user={user} placeId={match.params.id}/>
              ) : (
                <Grid item container justify='center'>
                  <Typography component="p" display="inline" variant="caption" style={{padding: 15}}>
                    No photo yet...
                  </Typography>
                </Grid>
              )}
            </Grid>
            {user && (
              <Grid item xs onClick={() => setOpen(true)} >
                <FormElement
                  type="file"
                  propertyName="image"
                  placeholder='Upload new photo'
                  variant='standard'
                  size='small'
                  onChange={(e) => setImage({[e.target.name]: e.target.files[0]})}
                />
              </Grid>
            )}
            <Grid item container xs justify='flex-end' className={open ? classes.open: classes.hide}>
              <Button disabled={!image} color="primary" variant="contained" onClick={uploadPhotoHandler}>Upload</Button>
            </Grid>
          </Grid>        
        </Grid>
        {user && !check && (
          <Grid item xs style={{marginTop: 15}}>
            <Typography component="h5" display="inline" variant="overline">
              Your Rate:
            </Typography>
            <ReviewForm placeId={match.params.id}/>
          </Grid>
        )}
        {place.reviews&&place.reviews.length> 0 && (
        <Grid item xs  style={{margin: '15px 0'}}>
          <Typography component="h5" display="inline" variant="overline">
            Reviews:
          </Typography>
          {place.reviews.map(review => (
            <Review
              key={review._id}
              props={review}
              placeId={match.params.id}
            />
          )).reverse()}
        </Grid>
        )}
      </Paper>
    </Grid>
  );
};

export default withRouter(PlacePage);