import React, { Component } from "react";
import { Input, Divider, Button, Tooltip } from "antd";
import pencilIcon from "./pencil-icon.png";
import { AiOutlineInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import "./index.css";

function PencilIcon() {
  return (
    <>
      <img src={pencilIcon} alt="edit-icon" />
    </>
  );
}

export default class index extends Component {
  state = {
    instruction: "",
    instructionsList: [],
    editedInstructionListItem:""
  };

  handleInput = (e) => {
    this.setState({
      instruction: e.target.value,
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
  handleDeleteInstructionList=(index)=>{
     
    let newInstructionList = this.state.instructionsList;
    newInstructionList.splice(index,1);

    this.setState({
        instructionList: newInstructionList,
      });
  }
  handleEditInstructionList=(index)=>{

  }
  render() {
    return (
      <div className="builder-saver">
        <div className="input-wrapper">
          <div className="builder-input">
            <Input
              className="name-workout"
              
              placeholder={"Name your workout "}
              bordered={false}
              suffix={<PencilIcon />}
            />
          </div>
          <div className="builder-input-saver">
            <div className="save-button-wrapper">
              <Button type="primary" className="save-button">
                Save Workout
              </Button>
            </div>
          </div>
        </div>
        <Divider className="input-divider" />
        <div className="instruction-wrapper">
          <div className="list-wrapper">
            <div className="instruction-input-wrapper">
              <Input
              name="instruction"
                placeholder={"Add Notes/ Instructions for client "}
                value={this.state.instruction}
                bordered={false}
                onChange={this.handleInput}
              />
              <div className="save-instruction-btn-wrapper">
                {this.state.instruction !== "" ||
                this.state.instructionsList.length > 0 ? (
                  <AiFillCheckCircle
                    className="save-instruction-btn"
                    onClick={this.handleSaveInstructionForList}
                  />
                ) : null}
              </div>
            </div>
            <ul className="instruction-list-wrapper">
              {this.state.instructionsList.map((instruction, index) => (
                <li className="list-input" key={index}>
                  <div className="list-input-wrapper">
                    <Input
                      className="bg-transparent"
                      name="editedInstructionListItem"
                      value={instruction}
                      bordered={false}
                      onChange={this.handleEditInstructionList}
                    />
                    <TiDelete className="delete-list-item" onClick={()=>this.handleDeleteInstructionList(index)}/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="build-workout">
            <Tooltip placement="top" title={"Demo Workout"}>
              <a href="build-workout" className="build-workout-link">
                How to build a workout?{" "}
                <AiOutlineInfoCircle className="info-icon" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
