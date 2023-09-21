import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const filterImages = (images, searchTerm, selectedTags, selectedTag) => {
  return images.filter((image) => {
    const includesSelectedTags =
      selectedTags.length === 0 || selectedTags.some((tag) => image.tags.includes(tag));
    const isMatchingSelectedTag = selectedTag === 'All' || image.tags.includes(selectedTag);
    return  includesSelectedTags && isMatchingSelectedTag;
  });
};

const Gallery = ({ searchTerm, setImages, selectedTags, selectedTag, images, loading }) => {
  const filteredImages = filterImages(images, searchTerm, selectedTags, selectedTag);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...filteredImages];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          Loading...
        </div>
      ) : (
        <>
          {images.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-gallery" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="image-grid-container"
                  >
                    {filteredImages.map((image, index) => (
                      <Draggable key={image.id} draggableId={image.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`image-container ${
                              snapshot.isDragging ? 'dragging' : ''
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="gallery-image"
                              data-aos="fade-in"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="image-not-found">
              Image not found for "{searchTerm}".
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
