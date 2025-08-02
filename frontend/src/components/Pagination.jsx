import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const Pagination = ({ onNext, onPrev, nextDisabled, prevDisabled }) => {
  return (
    <div className="flex items-center justify-between bg-transparent mt-4">
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous page"
        title="Previous page"
      >
        <MdNavigateBefore
          className={`w-12 h-12 ${
            prevDisabled
              ? 'text-gray-400'
              : 'text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-400'
          }`}
        />
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next page"
        title="Next page"
      >
        <MdNavigateNext
          className={`w-12 h-12 ${
            nextDisabled
              ? 'text-gray-400'
              : 'text-blue-500 hover:text-blue-700 dark:text-blue-200 dark:hover:text-blue-400'
          }`}
        />
      </button>
    </div>
  );
};

export default Pagination;
