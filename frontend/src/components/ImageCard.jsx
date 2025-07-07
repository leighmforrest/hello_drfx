const ImageCard = ({ image }) => (
  <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-lg h-80 flex flex-col">
    <img
      className="w-full h-48 object-cover"
      src={image.picture}
      alt={image.title || 'Image'}
    />
    <div className="px-6 py-4 bg-white flex-grow flex items-start">
      <p className="text-gray-700 text-base">{image.title}</p>
    </div>
  </div>
);

export default ImageCard;