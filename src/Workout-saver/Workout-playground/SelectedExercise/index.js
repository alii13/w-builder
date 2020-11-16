import React, { Component } from "react";
import { Checkbox, Input, Select } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";


export default class index extends Component {
  render() {
    const { Option } = Select;
    console.log(this.props);
    return (
      <Draggable draggableId={this.props.exercise.key} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.draggableProps}
            
            ref={provided.innerRef}
          >
            <div className={(snapshot.isDragging)?("selected-exercise dragging"):("selected-exercise")}>
              <div className="selected-exercise-left">
                <div className="checkbox-wrapper">
                  <Checkbox
                    className="checkbox"
                    onChange={this.onCheckboxChange}
                  ></Checkbox>
                </div>
                <div className="selected-exercise-content">
                  <div className="selected-exercise-image-wrapper">
                    <img
                      className="selected-exercise-image"
                      src="https://img.youtube.com/vi/JHdVMkRBuRA/hqdefault.jpg"
                      alt="exercise"
                    />
                  </div>
                  <div className="selected-exercise-description">
                    <p className="selected-exercise-title">
                     { this.props.exercise.ExerciseName+this.props.exercise.key}
                    </p>
                    <p className="selected-exercise-instruction">
                      Add Exercise Instruction
                    </p>
                  </div>
                </div>
              </div>
              <div className="selected-exercise-right">
                <div className="exercise-sets">
                  <Input
                    className="selected-exercise-input"
                    defaultValue="0"
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-time">
                  <Input
                    className="selected-exercise-input"
                    defaultValue="0"
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-reps">
                  <Input
                    className="selected-exercise-input"
                    defaultValue="0"
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-rest">
                  <Select
                    defaultValue="60s"
                    onChange={this.handleSecChnage}
                    className="res-seconds-btn"
                  >
                    <Option value="60s">60s</Option>
                    <Option value="120s">120s</Option>
                    <Option value="180s">180s</Option>
                    <Option value="240s">240s</Option>
                  </Select>
                </div>
              </div>
              <div className="selected-exercise-dragger"
               {...provided.dragHandleProps}>
                <GrDrag className="dragger" />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
