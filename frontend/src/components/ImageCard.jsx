import React from 'react';

const ImageCard = ({ image }) => (
  <div
    className="flex flex-col rounded-2xl overflow-hidden shadow-lg lg:h-fit"
    data-testid="imagecard"
  >
    {/* Square Image */}
    <div className="w-full">
      <img
        src={image.picture}
        alt={image.title || 'Image'}
        className="w-full h-full object-cover aspect-square"
      />
    </div>
    {/* Card Content */}
    <div className="px-6 py-4 flex-grow bg-white h-32">
      <p className="text-gray-700 text-base break-words">{image.title}</p>
    </div>
  </div>
);

export default ImageCard;
