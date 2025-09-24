// src/components/KanbanBoard.jsx
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, Button } from "react-bootstrap";

const columns = ["BACKLOG", "IN_PROGRESS", "REVIEW", "DONE"];

const KanbanBoard = ({ tasks, onDragEnd, onEdit, onDelete }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="d-flex justify-content-between">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-2 flex-grow-1"
                style={{
                  minHeight: "500px",
                  background: snapshot.isDraggingOver ? "#f0f8ff" : "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  margin: "0 8px",
                }}
              >
                <h5 className="text-center">{col}</h5>
                {tasks
                  .filter((task) => task.status === col)
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 shadow-sm"
                          style={{
                            ...provided.draggableProps.style,
                            background: snapshot.isDragging ? "#e6f7ff" : "white",
                          }}
                        >
                          <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>{task.description}</Card.Text>
                            <small>
                              Priority: {task.priority} | Due:{" "}
                              {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "—"}
                            </small>
                            <div className="mt-2 d-flex justify-content-between">
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => onEdit(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(task.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
