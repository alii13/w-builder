import React from "react";
import "./index.css";
import { Col } from "antd";
import { Draggable } from "react-beautiful-dnd";

export default function index(props) {
  const { ExerciseName, src, alt } = props;
  const imageLinkArray = src.split("=");
  const imageID = imageLinkArray[1];
  const IMAGE_URL = `https://img.youtube.com/vi/${imageID}/hqdefault.jpg`;
  return (
    <Draggable draggableId={props.exercise.key} index={props.index}>
      {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="gutter-row gutter-col-adder"
            sm={24}
            xs={24}
            md={6}
            lg={6}
          >
            <div className="exercise-container">
              <div className="exercise-image-wrapper">
                <img className="exercise-image" src={IMAGE_URL} alt={alt} />
              </div>
              <p className="exercise-image-text">{ExerciseName}</p>
            </div>
          </div>
      )}
    </Draggable>
  );
}
