import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import { labels } from "../../constants";

const Rate = ({ setScore, value, name }) => {
  const [hover, setHover] = useState(-1);

  return (
    <Grid item container xs={12} sm={4} alignItems="center">
      <Grid item xs={6} sm={12}>
        <span style={{ textTransform: "capitalize" }}>
          {name.replace(/([A-Z])/g, " $1")}:{" "}
        </span>
      </Grid>
      <Grid item container xs={6} sm={12}>
        <Grid item xs={12}>
          <Rating
            name={name}
            value={value}
            onChange={(event) => setScore(event)}
            onChangeActive={(event, newHover) => setHover(newHover)}
          />
        </Grid>
        <Grid item xs={12}>
          {labels[hover !== -1 ? hover : value]}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Rate;
