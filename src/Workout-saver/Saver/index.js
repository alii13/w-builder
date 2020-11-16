import React, { Component } from 'react'
import { Input, Divider, Button } from 'antd';
import pencilIcon from "./pencil-icon.png";
import { AiOutlineInfoCircle } from "react-icons/ai"
import "./index.css"



function PencilIcon() {
    return (
        <>
        <img src={pencilIcon} alt="edit-icon" />
        </>
    )
}

export default class index extends Component {
    render() {
        return (
            <div className="builder-saver">
                <div className="input-wrapper">
                    <div className="builder-input">
                        <Input className="name-workout"  placeholder={"Name your workout "} bordered={false} suffix={<PencilIcon/>}/>
                    </div>
                    <div className="builder-input-saver">
                        <div className="save-button-wrapper">
                        <Button type="primary" className="save-button">Save Workout</Button>
                        </div>
                    </div>
                </div>
                <Divider className="input-divider" />
                <div className="instruction-wrapper">
                <Input  placeholder={"Add Notes/ Instructions for client "} bordered={false}/>
                <div className="build-workout">
                    <a href="build-workout" className="build-workout-link">How to build a workout? <AiOutlineInfoCircle className="info-icon"/></a>
                </div>
                </div>
                
            </div>
        )
    }
}
