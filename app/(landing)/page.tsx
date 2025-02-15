'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* Hero Section */}
      <section className='relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32'>
        <div className='mx-auto max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              パパ準備
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              新しいパパになる準備、一緒に始めましょう。
              妊娠中のママをサポートしながら、父親としての自覚を育てていきましょう。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-16 flex justify-center gap-8'
          >
            <Image
              src='/images/papa_image_1.jpg'
              alt='父親が妊婦のお腹に手を当てている様子'
              className='rounded-lg shadow-xl w-1/3 h-64 object-cover'
              width={500}
              height={500}
            />
            <Image
              src='/images/papa_image_2.jpg'
              alt='赤ちゃんを抱っこする父親'
              className='rounded-lg shadow-xl w-1/3 h-64 object-cover'
              width={500}
              height={500}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24 bg-white'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-12 sm:grid-cols-3'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='relative rounded-2xl border border-gray-200 p-8 shadow-sm'
            >
              <div className='mb-4'>
                <Calendar className='h-12 w-12 text-blue-500' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900'>
                やるべきことを管理
              </h3>
              <p className='mt-4 text-gray-600'>
                妊娠・出産に関わる大切なタスクを簡単に登録・管理できます。
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className='relative rounded-2xl border border-gray-200 p-8 shadow-sm'
            >
              <div className='mb-4'>
                <ShoppingBag className='h-12 w-12 text-blue-500' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900'>
                必要なものリスト
              </h3>
              <p className='mt-4 text-gray-600'>
                赤ちゃんを迎えるために必要な買い物リストを簡単に作成できます。
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className='relative rounded-2xl border border-gray-200 p-8 shadow-sm'
            >
              <div className='mb-4'>
                <Heart className='h-12 w-12 text-blue-500' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900'>
                パートナーシップ
              </h3>
              <p className='mt-4 text-gray-600'>
                妊娠中の妻をサポートしながら、父親としての自覚を育てていきましょう。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative py-24 bg-blue-50'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center'
          >
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              新しい家族の一員として、今日から始めましょう
            </h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              パパになる準備は、家族みんなの幸せな未来への第一歩です。
            </p>
            <div className='mt-10 flex justify-center gap-x-6'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/sign_up')}
                className='rounded-md bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                無料で始める
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
