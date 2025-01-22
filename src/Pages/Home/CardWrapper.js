import React, { useEffect, useState } from "react";
import CardComponent from "./TaskCard";

export const CardWrapper = () => {
  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data.json"); // Fetching from the local JSON file
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setTaskData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (event) => {
    // Remove the class after drag ends
    event.currentTarget.classList.remove("dragging");
  };

  const handleDragStart = (event, cardId) => {
    event.dataTransfer.setData("cardId", cardId);
    // Add a class to make the drag element visible
    event.currentTarget.classList.add("dragging");
  };

  const handleDrop = (event, newStatus) => {
    const cardId = event.dataTransfer.getData("cardId");
    setTaskData((prevData) =>
      prevData.map((card) =>
        card.id.toString() === cardId ? { ...card, status: newStatus } : card
      )
    );
    console.log(`Card ID: ${cardId} moved to ${newStatus}`);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const getCardsByStatus = (status) =>
    taskData.filter((card) => card.status === status);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="card-wrapper">
      {["To Do", "In Progress", "Completed"].map((status) => {
        const cards = getCardsByStatus(status);
        return (
          <div
            key={status}
            className="column"
            onDrop={(event) => handleDrop(event, status)}
            onDragOver={allowDrop}
          >
            <h2>
              {status}
              <span>({cards.length})</span>
            </h2>
            {getCardsByStatus(status).map((card) => (
              <CardComponent
                key={card.id}
                id={card.id}
                status={card.status}
                title={card.title}
                date={card.date}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CardWrapper;
