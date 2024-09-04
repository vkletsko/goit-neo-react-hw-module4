import { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiErrorWarningFill } from 'react-icons/ri';
import {
  SearchBar,
  Loader,
  ErrorMessage,
  ImageGallery,
  LoadMoreBtn,
  CustomModal,
} from '@components';
import { fetchImages } from '@services';
import { toastConfig, PER_PAGE } from '@helpers';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cardHeight, setCardHeight] = useState(300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const listRef = useRef();

  useEffect(() => {
    if (!query) return;

    async function uploadImages() {
      try {
        const { results, total_pages } = await fetchImages(query, page);
        if (total_pages === 0) {
          throw new Error('Images not found');
        } else if (total_pages === 1 || total_pages === page) {
          toast('End of collection');
        } else if (page < 2) {
          toast.success('Your portion of images');
        }
        setTotalPages(total_pages);
        setImages(prevImages => [...prevImages, ...results]);
      } catch (error) {
        setError(true);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    uploadImages();
  }, [page, query]);

  useEffect(() => {
    if (images.length > PER_PAGE) {
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY + cardHeight * 2,
          behavior: 'smooth',
        });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleSearch = searchQuery => {
    if (query === searchQuery) {
      toast(`Duplicate search query. Please modify your query`, {
        icon: <RiErrorWarningFill color="#ffc107" size={26} />,
      });
      return;
    }

    setImages([]);
    setError(false);
    setLoading(true);
    setQuery(searchQuery);
    setPage(1);
  };

  const handleLoadMoreClick = async () => {
    const { height } = listRef.current.lastElementChild.getBoundingClientRect();
    setLoading(true);
    setCardHeight(height);
    setPage(prevValue => prevValue + 1);
  };

  const handleOpenModal = imageData => {
    setIsModalOpen(true);
    setSelectedImage(imageData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          items={images}
          listRef={listRef}
          openModal={handleOpenModal}
        />
      )}
      {page < totalPages && !loading && (
        <LoadMoreBtn handleLoadMore={handleLoadMoreClick} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {selectedImage && (
        <CustomModal
          selectedImage={selectedImage}
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      <Toaster toastOptions={{ ...toastConfig }} />
    </>
  );
};

export default App;
