import React, { Component } from "react";
import { Checkbox, Button, Select } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { BiRepeat } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SelectedExercise from "../SelectedExercise/index";
import { Droppable } from "react-beautiful-dnd";


export default class index extends Component {


  onCheckboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  handleCircuitWorkout(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { Option } = Select;

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
                  <p className="circuit-text">Save Workout</p>
                </div>
              </Button>
              <Button type="danger " className="delete-circuit">
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
          <div className="playground-left-bottom-header">
            <div className="exercise-name">
              <p className="exercise-description">Exercise Name</p>
            </div>
            <div className="exercise-analytics">
              <div className="exercise-sets">
                <p className="exercise-description">Sets</p>{" "}
                <AiOutlineInfoCircle className="exercise-icon" />
              </div>
              <div className="exercise-time">
                <p className="exercise-description">Time</p>{" "}
                <AiOutlineInfoCircle className="exercise-icon" />
              </div>
              <div className="exercise-rest">
                <p className="exercise-description">Rest</p>{" "}
                <AiOutlineInfoCircle className="exercise-icon" />
              </div>
              <div className="exercise-reps">
                <p className="exercise-description">Reps</p>{" "}
                <AiOutlineInfoCircle className="exercise-icon" />
              </div>
            </div>
          </div>
          <div className="playground-left-body">
            <Droppable droppableId={"left-column"}>
              {(provided) => (
                <div className="droppable-area" ref={provided.innerRef} {...provided.droppableProps}>
                  {this.props.selectedExercise.map((exercise,index) => (
                    <SelectedExercise key={exercise.key} exercise={exercise} index={index}  />
                  ))}
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
