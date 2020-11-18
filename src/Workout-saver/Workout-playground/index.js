import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { exercises } from "../../Exercises";
import PlaygroundLeft from "./PlaygroundLeft";
import PlaygroundRight from "./PlaygroundRight";
import { v4 as uuidv4 } from "uuid";
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
    exerciseIds.sort((a, b) => a.localeCompare(b))

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
      if(source.droppableId==="right-column"){
        this.setState({
          selectedExerciseIds: this.state.selectedExerciseIds.sort((a, b) => a.localeCompare(b))
        });
      }
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
      console.log(draggableId);
      let newStartExerciseIDs = Array.from(startExerciseIDs);
      let correctSearchIndex = undefined,
        temp;
      if (
        this.state.searchExercises?.length > 0 &&
        startExerciseIDs[source.index] !==
          this.state.searchExercises[source.index]?.ExerciseName
      ) {
        temp = startExerciseIDs.filter((id, index) => {
          console.log(id, this.state.searchExercises[source.index].key);
          if (id === this.state.searchExercises[source.index].key) {
            correctSearchIndex = index;
          }
        });
        console.log(correctSearchIndex, startExerciseIDs[correctSearchIndex]);
      }

      newStartExerciseIDs.splice(
        correctSearchIndex === undefined ? source.index : correctSearchIndex,
        1
      );

      //modify the right side exercise after dragging

      const newID = uuidv4();
      const resExerciseName =
        startExerciseIDs[
          correctSearchIndex === undefined ? source.index : correctSearchIndex
        ];
      let draggedExerciseData = Object.assign(
        {},
        this.state.exerciseData[resExerciseName]
      );
      draggedExerciseData.key = newID;
      newStartExerciseIDs.push(newID);

      let newGlobalExerciseData = this.state.exerciseData;
      newGlobalExerciseData[newID] = draggedExerciseData;

      const newFinishExerciseIDs = this.state.selectedExerciseIds;
      newFinishExerciseIDs.splice(destination.index, 0, draggableId);
      console.log(newFinishExerciseIDs);
      newStartExerciseIDs.sort((a, b) => a.localeCompare(b))

      const newState = {
        ...this.state,
        selectedExerciseIds: newFinishExerciseIDs,
        exerciseIds: newStartExerciseIDs,
        highlighterClass: "",
        searchExercises: [],
        exerciseData: newGlobalExerciseData,
      };
      this.setState(newState);
      this.dragEnd();
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
    const deleteIndexes = data.map((e, index) => {
      return e.indexData;
    });

    console.log(deleteIndexes);

    let newSelectedExerciseIds = this.state.selectedExerciseIds;

    newSelectedExerciseIds = newSelectedExerciseIds.filter(function (
      value,
      index
    ) {
      return deleteIndexes.indexOf(index) === -1;
    });

    console.log(newSelectedExerciseIds);

    this.setState({
      selectedExerciseIds: newSelectedExerciseIds,
    });
  };

  render() {
  
    const selectedExercise = this.state.selectedExerciseIds.map(
      (exerciseId) => this.state.exerciseData[exerciseId]
    );
    const exercisesData = this.state.exerciseIds.map(
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
            exercises={exercisesData}
            dragEnd={(click) => (this.dragEnd = click)}
            isDropDisabled={this.state.isDropDisabled}
            handleChildSearchExercises={this.handleSearchExercise}
          />
        </div>
      </DragDropContext>
    );
  }
}
