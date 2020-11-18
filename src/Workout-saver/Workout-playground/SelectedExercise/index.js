import React, { Component } from "react";
import { Checkbox, Input, Select } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import ClickOutHandler from "react-onclickout";

export default class index extends Component {
  state = {
    showDiv: false,
    instruction: "",
    instructionsList: [],
    editedInstructionListItem: false,
    sets: 0,
    time: 0,
    rest: 0,
    reps: "60s",
    checkedDiv:undefined
  };

  onCheckboxChange = (e, data) => {
    const modifiedData = {
      ...data,
      checked: false,
      sets:this.state.sets,
      time:this.state.time,
      rest:this.state.rest,
      reps:this.state.reps
    };
    this.props.handleCheckbox(modifiedData,e.target.checked,false);
    this.setState({
      checkedDiv:e.target
    })
  };

  showInstructionDiv = () => {
    this.setState({
      showDiv: true,
    });
  };

  handleSeconds = (value,data) => {
    this.setState({
      reps: value,
    },()=>{
      if(this.state.checkedDiv.checked){
        const modifiedData = {
          ...data,
          checked: true,
          sets:this.state.sets,
          time:this.state.time,
          rest:this.state.rest,
          reps:this.state.reps
        };
        this.props.handleCheckbox(modifiedData,this.state.checkedDiv.checked);
      }
    });
  };
  handleInput = (e) => {
    const name= e.target.name
    this.setState({
      [name]: e.target.value,
    });
  };

  handleInputChange = (e,data) => {
    const name = e.target.name;
  
    this.setState({
      [name]: e.target.value,
    },()=>{
      if(this.state.checkedDiv?.checked){
        const modifiedData = {
          ...data,
          checked: true,
          sets:this.state.sets,
          time:this.state.time,
          rest:this.state.rest,
          reps:this.state.reps
        };
        this.props.handleCheckbox(modifiedData,this.state.checkedDiv.checked);
      }
    });
  };
  handleSaveInstructionForList = () => {
    let newInstructionList = this.state.instructionsList;
    if (this.state.instruction !== "") {
      newInstructionList.push(this.state.instruction);
      this.setState({
        instructionList: newInstructionList,
        instruction: "",
      });
    }
  };
 
  handleEditedInstructionListItem=(e,index)=>{
    let newEditedInstructionList = this.state.instructionsList;
     newEditedInstructionList[index] = e.target.value;
    this.setState({
      editedInstructionListItem:true,
      instructionsList:newEditedInstructionList
    })
  }
  handleDeleteInstructionList=(index)=>{
     
    let newInstructionList = this.state.instructionsList;
    newInstructionList.splice(index,1);

    this.setState({
        instructionList: newInstructionList,
      });
  }
  handleSelectedInstructionClose = () => {
    this.setState({
      showDiv: false,
      editedInstructionListItem:false,
    });
  };

  render() {
    const { Option } = Select;
    const indexData = this.props.index;
    const data = {
      indexData,
      ...this.props.exercise,
    };
    const imageLinkArray = this.props.exercise.src.split("=");
    const imageID = imageLinkArray[1];
    const IMAGE_URL = `https://img.youtube.com/vi/${imageID}/hqdefault.jpg`;
  
    return (
      <Draggable draggableId={this.props.exercise.key} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className={
                snapshot.isDragging
                  ? "selected-exercise dragging"
                  : "selected-exercise"
              }
            >
              <div className="selected-exercise-left">
                <div className="checkbox-wrapper">
                  <Checkbox
                    className="checkbox"
                    onChange={(e) => this.onCheckboxChange(e, data)}
                  ></Checkbox>
                </div>
                <div className="selected-exercise-content">
                  <div className="selected-exercise-image-wrapper">
                    <img
                      className="selected-exercise-image"
                      src={IMAGE_URL}
                      alt="exercise"
                    />
                  </div>
                  <div className="selected-exercise-description">
                    <p className="selected-exercise-title">
                      {this.props.exercise.ExerciseName }
                    </p>
                    <p
                      className="selected-exercise-instruction"
                      onClick={this.showInstructionDiv}
                    >
                      Add Exercise Instruction
                    </p>
                  </div>
                </div>
              </div>
              <div className="selected-exercise-right">
                <div className="exercise-sets">
                  <Input
                    name="sets"
                    className="selected-exercise-input"
                    defaultValue="0"
                    value={this.state.sets}
                    placeholder="0"
                    onChange={(e)=>this.handleInputChange(e,data)}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-time">
                  <Input
                    name="time"
                    value={this.state.time}
                    className="selected-exercise-input"
                    defaultValue="0"
                    onChange={(e)=>this.handleInputChange(e,data)}
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-reps">
                  <Input
                    name="rest"
                    value={this.state.rest}
                    className="selected-exercise-input"
                    onChange={(e)=>this.handleInputChange(e,data)}
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </div>
                <div className="exercise-rest">
                  <Select
                    name="reps"
                    onChange={(e)=>this.handleSeconds(e,data)}
                    value={this.state.reps}
                    className="res-seconds-btn"
                  >
                    <Option value="60s">60s</Option>
                    <Option value="120s">120s</Option>
                    <Option value="180s">180s</Option>
                    <Option value="240s">240s</Option>
                  </Select>
                </div>
              </div>
              <div
                className="selected-exercise-dragger"
                {...provided.dragHandleProps}
              >
                <GrDrag className="dragger" />
              </div>
            </div>
            {this.state.showDiv && (
              <ClickOutHandler onClickOut={this.handleSelectedInstructionClose}>
                <div className="selected-exercise-wrapper">
                  <div className="instruction-input-wrapper w-100">
                    <Input
                      name="instruction"
                      placeholder={"Add Notes/ Instructions for client "}
                      value={this.state.instruction}
                      className="selected-exercise-instruction-input"
                      bordered={false}
                      onChange={this.handleInputChange}
                      onPressEnter={this.handleSaveInstructionForList}
                    />
                  </div>

                  <ul
                    className={
                      this.state.instructionsList.length < 1
                        ? "instruction-list-wrapper m-0"
                        : "instruction-list-wrapper bottom-list"
                    }
                  >
                    {this.state.instructionsList.map((instruction, index) => (
                      <li className="list-input" key={index}>
                        <div className="list-input-wrapper bottom-item-list">
                          <Input
                            className="bg-transparent"
                            name="editedInstructionListItem"
                            value={instruction}
                            bordered={false}
                            onChange={(e)=>this.handleEditedInstructionListItem(e,index)}
                          />
                          <TiDelete
                            className="delete-list-item"
                            onClick={() =>
                              this.handleDeleteInstructionList(index)
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClickOutHandler>
            )}
          </div>
        )}
      </Draggable>
    );
  }
}
