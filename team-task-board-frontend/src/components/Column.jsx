import React from "react";
import TaskCard from "./TaskCard";
import { Card } from "react-bootstrap";

function Column({ title, tasks }) {
  return (
    <Card className="p-2 h-100">
      <Card.Body>
        <h5 className="text-center mb-3">{title}</h5>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Column;
