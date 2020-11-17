import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { exercises } from "../../Exercises";
import PlaygroundLeft from "./PlaygroundLeft";
import PlaygroundRight from "./PlaygroundRight";
import "./index.css";

export default class index extends Component {
  state = {
    checkbox: false,
    exercises: exercises,
    exerciseIds: [],
    selectedExerciseIds: [],
    exerciseData: {},
    selectedExercise: {},
    highlighterClass: "initial",
    isDropDisabled: false,
    draggedExerciseName: "",
    searchExercises: [],
  };
  componentDidMount() {
    const exerciseIds = [];
    const exerciseData = {};

    exercises.map((exercise, index) => {
      exerciseIds.push(exercise.key);
      const key = exercise.key;
      const ExerciseName = exercise.ExerciseName;
      const src = exercise.src;
      exerciseData[key] = {
        ExerciseName,
        src,
        key,
      };
    });

    this.setState({
      exerciseIds: exerciseIds,
      exerciseData: exerciseData,
      selectedExercise: {},
      selectedExerciseIds: [],
    });
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      this.dragStart(false);
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      this.dragStart(false);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //moving in same column
    if (start === finish) {
      const newSelectedExerciseIds = Array.from(this.state.selectedExerciseIds);
      newSelectedExerciseIds.splice(source.index, 1);
      newSelectedExerciseIds.splice(destination.index, 0, draggableId);
      this.setState({
        selectedExerciseIds: newSelectedExerciseIds,
      });
    } else {
      // Moving from one list to another
      const startExerciseIDs = this.state.exerciseIds;
      const newStartExerciseIDs = Array.from(startExerciseIDs);
      let newSearchExercise;
      let correctSearchIndex = undefined,
        temp;

      if (
        this.state.searchExercises?.length > 0 &&
        startExerciseIDs[source.index] !==
          this.state.searchExercises[source.index]
      ) {
        temp = startExerciseIDs.filter((id, index) => {
          if (id === this.state.searchExercises[source.index].ExerciseName) {
            correctSearchIndex = index;
          }
        });
        console.log(correctSearchIndex, startExerciseIDs[correctSearchIndex]);
        newSearchExercise = this.state.searchExercises.filter(
          (exercise) =>
            exercise.ExerciseName !== startExerciseIDs[correctSearchIndex]
        );
      }

      newStartExerciseIDs.splice(
        correctSearchIndex === undefined ? source.index : correctSearchIndex,
        1
      );

      const newFinishExerciseIDs = this.state.selectedExerciseIds;
      newFinishExerciseIDs.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        selectedExerciseIds: newFinishExerciseIDs,
        exerciseIds: newStartExerciseIDs,
        highlighterClass: "",
        draggedExerciseName:
          correctSearchIndex === undefined
            ? ""
            : startExerciseIDs[correctSearchIndex],
        searchExercises: newSearchExercise,
      };
      this.setState(newState);
    }
    this.dragStart(false);
  };

  handleDragStart = (result) => {
    const { source } = result;

    if (source.droppableId === "right-column") {
      this.dragStart(true);
    }
  };

  handleSearchExercise = (searchExercises) => {
    this.setState({
      searchExercises: searchExercises,
    });
  };

  handleSelectedDelete = (data) => {
    console.log(data);
    let newSelectedExerciseIds = this.state.selectedExerciseIds;
    let reAddIds=[];

    data.forEach((data) => {
      reAddIds.push(data.ExerciseName);
      newSelectedExerciseIds.splice(data.index, 1);
      console.log("id")
    });

    console.log(newSelectedExerciseIds,reAddIds);
    this.setState({
      selectedExerciseIds:newSelectedExerciseIds,
      exerciseIds:[...this.state.exerciseIds,...reAddIds]
    })
  };

  render() {
    const selectedExercise = this.state.selectedExerciseIds.map(
      (exerciseId) => this.state.exerciseData[exerciseId]
    );
    const exercises = this.state.exerciseIds.map(
      (exerciseId) => this.state.exerciseData[exerciseId]
    );
  

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.handleDragStart}
      >
        <div className="builder-playground">
          <PlaygroundLeft
            selectedExercise={selectedExercise}
            dragStart={(click) => (this.dragStart = click)}
            handleSelectedDelete={this.handleSelectedDelete}
          />
          <PlaygroundRight
            exercises={exercises}
            isDropDisabled={this.state.isDropDisabled}
            draggedExerciseName={this.state.draggedExerciseName}
            handleChildSearchExercises={this.handleSearchExercise}
          />
        </div>
      </DragDropContext>
    );
  }
}
