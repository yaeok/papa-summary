import { products } from '@/data'
import { Product } from '@/domains/Product'

const Page = () => {
  return (
    <div className='space-y-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-lg'>かうものリスト</h1>
        <button
          className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md 
            hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
        >
          登録
        </button>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {products.map((product: Product) => (
          <div
            key={product.id}
            className='p-4 aspect-3/4 border-2 bg-white rounded-lg shadow-md flex flex-col justify-between'
          >
            <div className='space-y-2'>
              <h2 className='text-lg font-semibold'>{product.name}</h2>
              <p>{product.content}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className='text-xs bg-gray-200 rounded-full px-2 py-1'
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className='w-full text-end'>{product.price}円</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
