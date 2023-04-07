import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageButtonContainer = () => {
  // GET THE NUMBER OF PAGES AND PAGE NUMBER - HELP DISPLAY LIST PAGES TO THE USER
  // page - represents the active page that the user is on or has clicked to be on
  const { numOfPages, page, changePage } = useAppContext();
  // CREATES A PAGES ARRAY - Array.from CREATES AN ARRAY FROM AN OBJECT, STRING , NODE LIST ETC
  // _ represents the item in the newly created array, _ because we wont use it
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    // CREATE PAGES NUMBERS ACCORDING THE LENGTH OF NEWLY CREATED ARRAY(CREATED FROM numOfPages OBJECT)
    return index + 1;
  });
  // console.log(pages);

  // HANDLE PREV AND NEXT PAGE-BUTTON FUNCTIONALITIES
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      // newPage = 1 - alternative
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      // newPage = numOfPages - alternative
      newPage = 1;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;