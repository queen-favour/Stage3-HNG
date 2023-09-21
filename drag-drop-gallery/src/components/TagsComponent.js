import React, { useState } from "react";
import 'animate.css';


const TagsComponent = ({ setSelectedTag, fetchImagesByTag}) => {
  const [activeTag, setActiveTag] = useState("All");

  const handleTagClick = (tag) => {
    setActiveTag(tag);
        setSelectedTag(tag);

    // Fetch images based on the selected tag
    fetchImagesByTag(tag);
  };

  return (
    <div className="tags animate__animated animate__fadeInLeft">
      <div
        className={`tag ${activeTag === "All" ? "active" : ""}`}
        onClick={() => handleTagClick("All")}
      >
        All
      </div>
      <div
        className={`tag ${activeTag === "Beautiful" ? "active" : ""}`}
        onClick={() => handleTagClick("Beautiful")}
      >
        Beautiful
      </div> 
      <div
        className={`tag ${activeTag === "Dark" ? "active" : ""}`}
        onClick={() => handleTagClick("Dark")}
      >
        Dark
      </div>
      <div
        className={`tag ${activeTag === "Nature" ? "active" : ""}`}
        onClick={() => handleTagClick("Nature")}
      >
        Nature
      </div>
    </div>
  );
};

export default TagsComponent;
