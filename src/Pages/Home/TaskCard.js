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

const CardComponent = ({ id, status, title, date, onDragStart }) => {
  const navigate = useNavigate();
  let dragImage; // Store the custom drag image element

  const handleCardClick = () => {
    navigate(`/card-details/${id}`);
  };

  const handleDragStart = (event) => {
    onDragStart(event, id);

    // Create a custom drag image
    dragImage = event.currentTarget.cloneNode(true);
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";
    dragImage.style.opacity = "1";
    dragImage.style.backgroundColor = "white";
   
    document.body.appendChild(dragImage);

    // Use the custom drag image
    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnd = () => {
    if (dragImage) {
      dragImage.remove();
      dragImage = null;
    }
  };

  return (
    <div
      className="card p-24"
      id={`card-${id}`}
      // onClick={handleCardClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="status-heading">{status}</span>
      <h5 className="heading-title">
        <img src={CardIcon} alt="Card Icon" /> {title}
      </h5>
      <span className="date-data">{date}</span>
    </div>
  );
};

export default CardComponent;
