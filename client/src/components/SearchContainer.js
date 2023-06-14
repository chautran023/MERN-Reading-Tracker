import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer.js';
import { FormRow, FormRowSelect } from '../components'
import { useState, useMemo } from 'react';

const SearchContainer = () => {
    const {isLoading,
        searchStatus,
        searchGenres,
        searchPurpose,
        sort,
        sortOptions,
        handleChange,
        clearFilters,
        genresOptions,
        statusOptions,
        purposeOptions,
        filterPrice,
        filterPriceOptions } = useAppContext()
    const [localSearch, setLocalSearch] = useState('');
    const handleSearch = (e) => {
        handleChange({name:e.target.name, value:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    };
    const debounce = () => {
        let timeoutID;
        return (e) => {
          setLocalSearch(e.target.value);
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleChange({ name: e.target.name, value: e.target.value });
          }, 1000);
        };
      };
      // eslint-disable-next-line
      const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className="form">
                <h4>Tìm kiếm</h4>
                <div className="form-center">
                {/* search itemName */}
                <FormRow 
                    type='text'
                    name='search'
                    value={localSearch}
                    labelText='tên sách' 
                    handleChange={optimizedDebounce}
                /> 
                {/* search status */}
                <FormRowSelect
                    labelText='status'
                    name='searchStatus'
                    value={searchStatus}
                    handleChange={handleSearch}
                    list={['tất cả', ...statusOptions]}
                />
                {/* search genres */}
                <FormRowSelect
                    labelText='thể loại'
                    name='searchGenres'
                    value={searchGenres}
                    handleChange={handleSearch}
                    list={['tất cả', ...genresOptions]}
                />
                {/* search purpose */}
                <FormRowSelect
                    labelText='Mục đích'
                    name='searchPurpose'
                    value={searchPurpose}
                    handleChange={handleSearch}
                    list={['tất cả', ...purposeOptions]}
                />
                {/* filters */}
                <FormRowSelect
                    labelText='Giá'
                    name='filterPrice'
                    value={filterPrice}
                    handleChange={handleSearch}
                    list={['tất cả', ...filterPriceOptions]}
                />
                {/* sort */}
                <FormRowSelect
                    labelText='Sắp xếp'
                    name='sort'
                    value={sort}
                    handleChange={handleSearch}
                    list={sortOptions}
                />
                <button
                    type='submit'
                    className='btn btn-block clear-btn'
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    Xóa bộ lọc
                </button>
                </div>
            </form>
        </Wrapper>

)}
export default SearchContainer;

