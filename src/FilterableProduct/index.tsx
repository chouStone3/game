import { Fragment, useState } from "react"
import "./index.css"

interface Iprops {
    searchText: string,
    setSearchText: (value: string) => void,
    inStockOnly: boolean,
    setInStockOnly: (value: boolean) => void
}

const SearchBar = ({ searchText, setSearchText, inStockOnly, setInStockOnly }: Iprops) => {
    return <form>
        <input type="text" value={searchText} placeholder="Search..." onChange={(e) => setSearchText(e.target.value)} />
        <label>
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
            {' '}
            Only show products in stock
        </label>
    </form>
}
const ProductCategoryRow = ({ category }: { category: string }) => {
    return <tr>
        <th colSpan={2}>{category}</th>
    </tr>
}

const ProductRow = ({ product }: { product: PRODUCT }) => {
    const name = product.stocked ? product.name : <span style={{ color: 'red' }}> {product.name}</span>
    return <>
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    </>
}

const ProductTable = ({ products, searchText, inStockOnly }: { products: PRODUCT[], searchText: string, inStockOnly: boolean }) => {
    /* 
    分成三个部分：
    头部、类别行、product行
    */
    const cateGorys: string[] = [];
    const rows: PRODUCT[][] = [];

    products.forEach((product) => {
        if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) return
        if (inStockOnly && !product.stocked) return
        const index = cateGorys.indexOf(product.category)
        if (index === -1) {
            cateGorys.push(product.category)
            rows.push([product])
        } else {
            rows[index].push(product)
        }
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((item, index) => {
                    return <Fragment key={index}>
                        <ProductCategoryRow
                            category={cateGorys[index]}
                        />
                        {item.map((product) => {
                            return <ProductRow
                                product={product}
                                key={product.name} />
                        })}
                    </Fragment>
                })}
            </tbody>
        </table>
    )

}


const FilterableProductTable = ({ products }: { products: PRODUCT[] }) => {
    const [searchText, setSearchText] = useState('')
    const [inStockOnly, setInStockOnly] = useState(false)

    return <>
        <SearchBar searchText={searchText} setSearchText={setSearchText} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
        <ProductTable products={products} searchText={searchText} inStockOnly={inStockOnly} />
    </>
}
interface PRODUCT {
    category: string,
    price: string,
    stocked: boolean,
    name: string
}

const PRODUCTS: PRODUCT[] = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];


export default function FilterableProduct() {
    return <FilterableProductTable products={PRODUCTS} />;
}