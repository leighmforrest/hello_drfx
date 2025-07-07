import React from 'react';
import ImageCard from './ImageCard';

const ImageCardContainer = ({ images }) => (
  <section className="min-h-screen grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {images.map((image) => (
      <ImageCard key={image.pk} image={image} />
    ))}
  </section>
);

export default ImageCardContainer;
