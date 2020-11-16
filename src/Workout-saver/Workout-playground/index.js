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
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
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
      newStartExerciseIDs.splice(source.index, 1);

      const newFinishExerciseIDs = this.state.selectedExerciseIds;
      newFinishExerciseIDs.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        selectedExerciseIds: newFinishExerciseIDs,
        exerciseIds: newStartExerciseIDs,
      };
      this.setState(newState);
    }
  };

  render() {
    const selectedExercise = this.state.selectedExerciseIds.map(
      (exerciseId) => this.state.exerciseData[exerciseId]
    );
    const exercises = this.state.exerciseIds.map(
      (exerciseId) => this.state.exerciseData[exerciseId]
    );
    console.log(this.state.selectedExerciseIds, this.state.exerciseIds);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="builder-playground">
          <PlaygroundLeft
            selectedExercise={selectedExercise}
          />
          <PlaygroundRight exercises={exercises} />
        </div>
      </DragDropContext>
    );
  }
}
