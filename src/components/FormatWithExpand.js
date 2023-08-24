import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function FormatWithExpand({ data, spacing }) {
  // State to track whether the object/array is expanded or collapsed
  const [expanded, setExpanded] = useState(true);

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // If data is not an object, render it as a simple span
  if (typeof data !== "object") {
    return <span> {JSON.stringify(data)}</span>
  }

  // Determine whether data is an array
  const isArray = Array.isArray(data);

return (
    <div>
      {/* Toggle arrow icon for expanding/collapsing */}
      <span onClick={toggleExpanded} style={{ cursor: "pointer" }}>
        {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </span>
      
      {/* Opening bracket for array/object */}
      {isArray ? "[" : "{"}
      
      {/* Render nested items if expanded */}
      {expanded && (
        <ul style={{ listStyleType: "none", paddingLeft: "1rem" }}>
          {isArray
            ? data.map((item, index) => (
                <li key={index} style={{ marginLeft: `${spacing - 1}rem` }}>
                  {/* Recursively render nested array items */}
                  <FormatWithExpand data={item} spacing={spacing} />
                </li>
              ))
            : Object.entries(data).map(([key, value]) => (
                <li key={key} style={{ marginLeft: `${spacing - 1}rem` }}>
                  <span>
                    {/* Render key and recursively render nested object values */}
                    {JSON.stringify(key)}:
                    <FormatWithExpand data={value} spacing={spacing} />
                  </span>
                </li>
              ))}
        </ul>
      )}
      
      {/* Closing bracket for array/object */}
      {isArray ? "]" : "}"}
    </div>
  );
}

export default FormatWithExpand;
