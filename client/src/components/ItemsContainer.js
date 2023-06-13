import { useEffect } from "react"
import { Loading } from '../components'
import Item from "./Item.js"
import Wrapper from "../assets/wrappers/ItemsContainer.js"
import { useAppContext } from "../context/appContext"
import PageBtnContainer from './PageBtnContainer'

const ItemsContainer = () => {
    const { items, isLoading, numOfItems, page, getItems,
        search, searchStatus, searchGenres, searchPurpose, sort,
        numOfPages} = useAppContext()
    useEffect(() => {
        getItems()
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchGenres, searchPurpose, sort])

    if(isLoading) return <Loading center />
    if(items.length === 0) {
        return (
        <Wrapper>
            <h2>Chưa có quyển sách nào...</h2>
        </Wrapper>
    )}
    return (
        <Wrapper>
            <h5>Tìm thấy {numOfItems} kết quả</h5>
            <div className="items">
                {items.map((item) => {
                    return (
                    <Item key={item._id}{...item}></Item>
                )})}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
            
        </Wrapper>
    )
};
export default ItemsContainer;

