import React, { Component } from "react";
import { Button, Input, Switch, Row } from "antd";
import Exercise from "../Exercise-Structure";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineFilter } from "react-icons/hi";
import { Droppable } from "react-beautiful-dnd";

export default class index extends Component {
  state = {
    searchText: "",
    exercises: this.props.exercises,
    searchExercises: [],
  };
  
  static getDerivedStateFromProps(nextProps, prevState) {

    let newSearchExercises;
    console.log(nextProps.draggedExerciseName)
    if (nextProps.draggedExerciseName !== "") {
      newSearchExercises = prevState.searchExercises.filter(
        (exercise) => exercise.ExerciseName !== nextProps.draggedExerciseName
      );
      console.log(newSearchExercises)
      return {
        searchExercises: newSearchExercises,

      };
    }
    return null
  }



  handleHideExercise = (checked) => {
    console.log(`switch to ${checked}`);
  };

  handleSecChnage(value) {
    console.log(`selected ${value}`);
  }
  handleExerciseSearch = (e) => {
    
    const searchExercises = this.props.exercises.filter((exercise) =>
      exercise.ExerciseName.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    this.props.handleChildSearchExercises(searchExercises);
   
    this.setState({
      searchText: e.target.value,
      searchExercises: searchExercises,
    });
  };

  render() {
    
    return (
      <>
        <div className="playground-right">
          <div className="playground-right-header">
            <div className="search-wrapper">
              <div className="search">
                <Input
                  prefix={<BiSearchAlt2 />}
                  onChange={this.handleExerciseSearch}
                  className="search-input"
                  placeholder="Basic usage"
                  value={this.state.searchText}
                />
              </div>
              <div className="search-filter">
                <Button type="default" className="filter-wrapper">
                  <div className="filter-icon">
                    <HiOutlineFilter className="filter-button" />
                  </div>
                </Button>
              </div>
            </div>
            <div className="search-bottom-wrapper">
              <div className="hider-button">
                <Switch defaultChecked onChange={this.handleHideExercise} />
                <p className="hider-btn-text">Hide Tread Exercises</p>
              </div>
              <div className="custom-exercise-wrapper">
                <Button type="primary" className="custom-exercise">
                  <div className="wrapper-center">
                    <p className="circuit-text">+ Add your custom exercise</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="playground-right-body">
            <div
              gutter={{ xs: 9, sm: 16, md: 24, lg: 32 }}
              className="exercises-zone"
            >
              <Droppable
                droppableId={"right-column"}
                isDropDisabled={true}
                direction="horizontal"
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {this.state.searchText === ""
                      ? this.props.exercises&&this.props.exercises.map((exercise, index) => (
                          <Exercise
                            ExerciseName={exercise.ExerciseName}
                            src={exercise.src}
                            key={exercise.key}
                            exercise={exercise}
                            index={index}
                            alt={exercise.key}
                          />
                        ))
                      : this.state.searchExercises.map((exercise, index) => (
                          <Exercise
                            ExerciseName={exercise.ExerciseName}
                            src={exercise.src}
                            key={exercise.key}
                            exercise={exercise}
                            index={index}
                            alt={exercise.key}
                          />
                        ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </>
    );
  }
}
