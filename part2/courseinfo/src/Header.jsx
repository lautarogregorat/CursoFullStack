import React from "react";

const Header = ({ parts }) => {
    
    console.log(parts)

    const total = parts.reduce((accumulator, p) => accumulator + p.exercises, 0);

  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>{part.name} {part.exercises}</p>
      ))}
      <p>Total of {total} exercises</p>

    </>

  );
};

export default Header;
