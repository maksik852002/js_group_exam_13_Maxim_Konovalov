import React, { Component } from "react";
import { fetchPlaces } from "../../store/actions/placesActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Place from "../../components/Place/Place";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

class Places extends Component {

  componentDidMount() {
    this.props.fetchPlaces();
  }

  render() {
    return (
      <Box mt={3}>
        <Grid container direction="column" spacing={1}>
          {this.props.user && (
            <Grid item>
              <Button color="primary" component={Link} to={"/add-place"}>
                Add new place
              </Button>
            </Grid>
          )}
          <Grid item container direction="row" spacing={1} justify='space-evenly'>
            {this.props.places.map((place) => (
              <Place
                key={place._id}
                id={place._id}
                title={place.title}
                image={place.image}
                user={place.user}
                reviews={place.reviews.length}
                photos={place.photos.length}
                totalScores={place.totalScores}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  places: state.places.places,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPlaces: () => dispatch(fetchPlaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Places);
