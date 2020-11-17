import React, { Component } from "react";
import { Checkbox, Button, Select,Tooltip } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { BiRepeat } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SelectedExercise from "../SelectedExercise/index";
import { Droppable } from "react-beautiful-dnd";
import Placeholder from "./Placeholder";

export default class index extends Component {
  state = {
    highlighterClass: "",
    selectedData: [],
    selectedExercises:[]
  };


  static getDerivedStateFromProps(nextProps, prevState) {
    let newSearchExercises = nextProps.selectedExercise;
    if (nextProps.selectedExercise !== prevState.selectedExercise) {
      return {
        selectedExercises: newSearchExercises,
      };
    }
    return null;
  }

  onCheckboxChange = (e) => {
    if (e.checked) {
      // const checkForAlready = this.state.selectedData.map((data,index)=>{

      // })

      const newSelectedData = [...this.state.selectedData, e];
      this.setState(
        {
          selectedData: newSelectedData,
        },
        () => {
          console.log(this.state.selectedData, "add");
        }
      );
    } else {
      const newSelectedData = this.state.selectedData.filter(
        (data) => data.ExerciseName !== e.ExerciseName
      );
      this.setState(
        {
          selectedData: newSelectedData,
        },
        () => {
          console.log(this.state.selectedData, "delete");
        }
      );
    }
  };

  handleCircuitWorkout(value) {
    console.log(`selected ${value}`);
  }
  changeBorderColor = (value) => {
    this.setState({
      highlighterClass: value ? "highlight" : "",
    });
  };
  handleDelete = () => {
    this.props.handleSelectedDelete(this.state.selectedData);
    this.setState({
      selectedData:[]
    })
  };
  componentDidMount() {
    this.props.dragStart(this.changeBorderColor);
  }

  render() {
    const { Option } = Select;
    console.log(this.state.selectedExercises)

    return (
      <>
        <div className="playground-left">
          <div className="playground-left-header">
            <div className="circuit">
              <Checkbox
                className="checkbox"
                onChange={this.onCheckboxChange}
              ></Checkbox>
              <Button type="primary" className="create-circuit">
                <div className="wrapper-center">
                  <BiRepeat className="repeat" />
                  <p className="circuit-text">Create Circuit</p>
                </div>
              </Button>
              <Button
                type="danger "
                className="delete-circuit"
                onClick={this.handleDelete}
              >
                <div className="delete-icon">
                  <AiOutlineDelete className="delete" />
                </div>
              </Button>
            </div>
            <div className="circuit-workouts">
              <div className="circuit-dropdown">
                <Select
                  defaultValue="Circuit Workout"
                  onChange={this.handleCircuitWorkout}
                  className="cicruit-btn-text"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className={"playground-left-bottom-header"}>
            <div className="exercise-name">
              <p className="exercise-description">Exercise Name</p>
            </div>
            <div className="exercise-analytics">
              <div className="exercise-sets">
                <p className="exercise-description">Sets</p>{" "}
                <Tooltip placement="top" title={"Number of Sets"}>
                <AiOutlineInfoCircle className="exercise-icon" />
                </Tooltip>
              </div>
              <div className="exercise-time">
                <p className="exercise-description">Time</p>{" "}
                <Tooltip placement="top" title={"Total Time for workout"}>
                <AiOutlineInfoCircle className="exercise-icon" />
                </Tooltip>
              </div>
              <div className="exercise-rest">
                <p className="exercise-description">Rest</p>{" "}
                <Tooltip placement="top" title={"Rest Time"}>
                <AiOutlineInfoCircle className="exercise-icon" />
                </Tooltip>
              </div>
              <div className="exercise-reps">
                <p className="exercise-description">Reps</p>{" "}
                <Tooltip placement="top" title={"Number of Repetitions"}>
                <AiOutlineInfoCircle className="exercise-icon" />
                </Tooltip>
              </div>
            </div>
          </div>
          <div
            className={
              this.state.highlighterClass === ""
                ? "playground-left-body"
                : "playground-left-body bg-drag"
            }
          >
            <Droppable droppableId={"left-column"}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    snapshot.isDraggingOver &&
                    this.props.selectedExercise.length > 0
                      ? "droppable-area column-drag"
                      : "droppable-area"
                  }
                >
                  {this.props.selectedExercise.length < 1 ? (
                    <div className="drag-drop-placeholder">
                      <Placeholder />
                    </div>
                  ) : (
                    this.props.selectedExercise.map((exercise, index) => (
                      <SelectedExercise
                        key={exercise.key}
                        exercise={exercise}
                        handleCheckbox={this.onCheckboxChange}
                        index={index}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </>
    );
  }
}
