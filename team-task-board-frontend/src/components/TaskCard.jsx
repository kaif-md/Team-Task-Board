import React from "react";
import { Card } from "react-bootstrap";

function TaskCard({ task }) {
  return (
    <Card className="mb-2 shadow-sm">
      <Card.Body>
        <Card.Title className="h6">{task.title}</Card.Title>
        <Card.Text className="text-muted small">{task.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
