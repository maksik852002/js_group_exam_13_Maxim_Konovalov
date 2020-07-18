import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { apiURL } from '../../constants';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {deletePhoto} from "../../store/actions/photosActions";
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '10px 0 20px',
    "&:first-child li" : {
      minWidth: 350,
      maxWidth: 350
    }
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const Photos = ({photos, user, placeId}) => {
  const classes = useStyles();
  const path = apiURL + "/";
  const dispatch=useDispatch();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} spacing={10}>
        {photos.reverse().map((el) => (
          <GridListTile key={el._id}>
            <img src={path + el.image} alt={el.image} />
            <GridListTileBar
              title={`Uploaded by @${el.user.username}`}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={ user && user.role ==='admin' &&(
                <IconButton onClick={() => dispatch(deletePhoto(el._id, placeId))}>
                  <DeleteIcon className={classes.title} />
                </IconButton>
              )}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Photos;