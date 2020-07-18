import React, { Component } from "react";
import FormElement from "../UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class PlaceForm extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    agree: 'no'
  };

  submitFormHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(this.state).forEach((key) => {
      let value = this.state[key];
      formData.append(key, value);
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  getFieldError = (fieldName) => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="title"
              title="Title"
              size='small'
              variant='outlined'
              placeholder="Enter title"
              onChange={this.inputChangeHandler}
              value={this.state.title}
              error={this.getFieldError("title")}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="description"
              title="Description"
              size='small'
              variant='outlined'
              placeholder="Enter description"
              onChange={this.inputChangeHandler}
              value={this.state.description}
              error={this.getFieldError("description")}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="image"
              title="Image"
              size='small'
              variant='outlined'
              onChange={this.fileChangeHandler}
              error={this.getFieldError("image")}
            />
          </Grid>
          <Grid item container xs direction='column'  alignItems='flex-end'>
            <Grid item container justify='flex-start' xs={12} sm={8} md={6}>
              <FormControlLabel
                label="I understand"
                control={<Checkbox value='yes' required onChange={this.inputChangeHandler} name="agree" />}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <FormHelperText>By submiting this form, you agree that the following information will be submitted to the public domain, and administrators of this site will have full control over the said information.</FormHelperText>
            </Grid>
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">
              Add place
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PlaceForm;
