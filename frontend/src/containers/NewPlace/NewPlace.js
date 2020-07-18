import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlace } from "../../store/actions/placesActions";
import PhotoForm from "../../components/PlaceForm/PlaceForm";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const NewPlace = () => {
  const error = useSelector((state) => state.places.error);
  const dispatch = useDispatch();
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10} lg={6}>
        <Box pb={2} pt={2}>
          <Typography variant="h4">Add New Place</Typography>
        </Box>
        <PhotoForm
          onSubmit={(data) => dispatch(createPlace(data))}
          error={error}
        />
      </Grid>
    </Grid>
  );
};

export default NewPlace;
