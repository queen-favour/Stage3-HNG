import React, { useState, useEffect } from 'react';
import GalleryNavbar from '../components/GalleryNavbar';
import Gallery from '../components/Gallery';
import TagsComponent from '../components/TagsComponent';

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All'); // Initialize with 'All' or a default tag
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImagesByTag = (tag, searchTerm) => {
    setLoading(true);
    const apiKey = 'EV3ZPgPEnRb9YXygbNcSLjVnDRiYHIB89nkHNuq1pfoCVkCS0RLBFdln';
    let apiUrl = `https://api.pexels.com/v1/search?query=${tag}&per_page=50`;
    if (searchTerm) {
      apiUrl = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=80`;
    }
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const imagesWithTags = data.photos.map((photo) => ({
          id: photo.id.toString(),
          src: photo.src.portrait,
          alt: photo.photographer,
          tags: ['Animation', 'Beautiful', 'Cars', 'Dark', 'Nature'],
        }));
        setImages(imagesWithTags);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    fetchImagesByTag(selectedTag, searchTerm);
  };

  useEffect(() => {
    fetchImagesByTag(selectedTag, searchTerm);
  }, [selectedTag, searchTerm]);

  return (
    <div>
      <GalleryNavbar setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      &nbsp;
      <br className='break' />
      <br className='break'/>
      <br />
      <TagsComponent setSelectedTag={setSelectedTag} fetchImagesByTag={fetchImagesByTag} />
      <br />
      <Gallery
        searchTerm={searchTerm}
        setImages={setImages}
        selectedTags={selectedTags}
        selectedTag={selectedTag}
        images={images}
        loading={loading}
      />
    </div>
  );
};

export default GalleryPage;
