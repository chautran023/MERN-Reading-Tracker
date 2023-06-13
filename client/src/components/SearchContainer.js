import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer.js';
import { FormRow, FormRowSelect } from '../components'

const SearchContainer = () => {
    const {isLoading,
        search,
        searchStatus,
        searchGenres,
        searchPurpose,
        sort,
        sortOptions,
        handleChange,
        clearFilters,
        genresOptions,
        statusOptions,
        purposeOptions } = useAppContext()
    const handleSearch = (e) => {
        // if(isLoading) return : bỏ cái này thì nó ko bị chờ thay đổi isLoading khi gõ search nữa 
        handleChange({name:e.target.name, value:e.target.value})
    }
    return (
        <Wrapper>
            <form className="form">
                <h4>Tìm kiếm</h4>
                <div className="form-center">
                {/* search itemName */}
                <FormRow 
                    type='text'
                    name='search'
                    value={search}
                    labelText='tên sách' 
                    handleChange={handleSearch}
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
                    onClick={(e) => {
                        e.preventDefault()
                        clearFilters()
                      }}
                >
                    Xóa bộ lọc
                </button>
                </div>
            </form>
        </Wrapper>

)}
export default SearchContainer;

