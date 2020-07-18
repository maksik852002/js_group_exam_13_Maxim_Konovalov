import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { deletePlace } from '../../store/actions/placesActions';
import { apiURL, labels } from "../../constants";


const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    margin: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Place = ({title, image, id, totalScores, reviews, photos}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const picture = apiURL + "/" + image;
  const overall = totalScores&&Object.keys(totalScores).reduce((acc, curr) => (acc + Math.round(totalScores[curr]/reviews)/3),0);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardActionArea component={Link} to={"/places/" + id}>
          <CardMedia
            component="img"
            alt={title}
            height="300"
            image={picture}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{textTransform: 'capitalize', textAlign: 'center'}}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box pb={2} px={2}>
          <Grid container justify='space-between' alignItems='flex-end' >
            <Grid item xs={6} container direction='column' spacing={1}>
              <Grid item xs>
                <Rating value={parseInt(overall)} readOnly size="small"/>
              </Grid>
              <Grid item xs>
                ({Math.round(overall)>0? labels[Math.round(overall)]: 'none'}, {reviews} {reviews>1?'reviews':'review'})
              </Grid>
              <Grid item container alignItems='center' xs>
                <PhotoCamera size='small'/> <span style={{marginLeft: 5}}>{photos} {photos>1?'photos':'photo'}</span>
              </Grid>
            </Grid>
            {user&&user.role === 'admin' && (
              <Grid item xs={6} container justify='flex-end' style={{margin: '0px -12px -12px 0'}}>
                <IconButton onClick={() => dispatch(deletePlace(id))}>
                  <DeleteIcon/>
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default Place;