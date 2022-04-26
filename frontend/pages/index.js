import BlogOne from '../components/blog/blogOne'
import BlogTwo from '../components/blog/blogTwo'

export default function Home() {
  return (
    <>
      <BlogOne />
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Tüm Yazılarımız
        </h2>
      </div>
      <BlogTwo />
    </>
  )
}
