// import React from "react";
// import { useNavigate } from "react-router-dom";
// import CardIcon from "../../Paper.png";

// const CardComponent = ({ id, status, title, date, onDragStart }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     navigate(`/card-details/${id}`);
//   };

//   return (
//     <div
//       className="card p-24"
//       id={`card-${id}`}
//       onClick={handleCardClick}
//       draggable
//       onDragStart={(event) => onDragStart(event, id)}
//     >
//       <span className="status-heading">{status}</span>
//       <h5 className="heading-title">
//         <img src={CardIcon} alt="Card Icon" /> {title}
//       </h5>
//       <span className="date-data">{date}</span>
//     </div>
//   );
// };

// export default CardComponent;

import React from "react";
import { useNavigate } from "react-router-dom";
import CardIcon from "../../Paper.png";
import trash from "../../../src/trash-solid.svg"
const CardComponent = ({ id, status, title, date, onDragStart, onDelete }) => {
  const navigate = useNavigate();
  let dragImage;

  const handleCardClick = () => {
    navigate(`/card-details/${id}`);
  };

  const handleDragStart = (event) => {
    onDragStart(event, id);

    dragImage = event.currentTarget.cloneNode(true);
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";
    dragImage.style.opacity = "1";
    dragImage.style.backgroundColor = "white";

    document.body.appendChild(dragImage);

    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnd = () => {
    if (dragImage) {
      dragImage.remove();
      dragImage = null;
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (isConfirmed) {
      onDelete(id); // Call the onDelete prop with the card ID
    }
  };

  return (
    <div
      className="card p-24"
      id={`card-${id}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-st-head">
        <span className="status-heading">{status}</span>
        <button className="dlt-btn" onClick={handleDelete}>
          <img src={trash} alt="" />
        </button>
      </div>
      <h5 className="heading-title">
        <img src={CardIcon} alt="Card Icon" /> {title}
      </h5>
      <span className="date-data">{date}</span>
    </div>
  );
};

export default CardComponent;
