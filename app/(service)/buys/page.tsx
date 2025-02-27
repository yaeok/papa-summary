import AddProductButton from './_components/add_product/AddProductButton'
import ProductGrid from './_components/grid/ProductGrid'

const Page = () => {
  return (
    <div className='space-y-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-lg'>かうものリスト</h1>
        <AddProductButton />
      </div>
      <ProductGrid />
    </div>
  )
}

export default Page
