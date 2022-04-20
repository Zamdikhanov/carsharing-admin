import ReactPaginate from 'react-paginate';
import css from './Pagination.module.scss';

function Pagination({ pageCount = 1, forcePage = 1, onPageChange = () => { } }) {
    return (
        <ReactPaginate
            className={css.paginate}
            pageLinkClassName={css.paginate__pageLinkClassName}
            activeLinkClassName={css.paginate__activeLinkClassName}
            previousLinkClassName={css.paginate__previousLinkClassName}
            nextLinkClassName={css.paginate__nextLinkClassName}
            breakLinkClassName={css.paginate__breakLinkClassName}
            breakLabel="..."
            nextLabel="»"
            onPageChange={(number) => { onPageChange(number.selected) }}
            pageCount={pageCount}
            forcePage={forcePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel="«"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
