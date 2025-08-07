import { Link } from 'react-router';

const ImageCard = ({ image }) => (
  <div
    className="flex flex-col rounded-2xl overflow-hidden shadow-lg h-fit"
    data-testid="imagecard"
  >
    {/* Square Image */}
    <div className="w-full">
      <Link to={`/picture/${image.pk}`}>
        <img
          src={image.picture}
          alt={image.title}
          className="w-full h-full object-cover aspect-square"
        />
      </Link>
    </div>
    {/* Card Content */}
    <div className="flex flex-col justify-center px-6 py-4 flex-grow bg-white h-32">
      <p className="text-gray-700 text-base break-words">{image.title}</p>
    </div>
  </div>
);

export default ImageCard;
