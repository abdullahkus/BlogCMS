import Breadcrumbs from "../../components/breadcrumbs";
import Head from "next/head";

export default function CategoryDetails({ posts, category }) {
  return (
    <>
      <div className="relative py-16 bg-white overflow-hidden">
        <Head>
          <title>{category.title}</title>
          <meta property="og:title" content={category.seo_title} />
          <meta property="og:description" content={category.seo_description} />
        </Head>
        <div className=" max-w-7xl mx-auto px-2 sm:px-6 lg:px-8relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {category.name}
              </span>
            </h1>
            <div className="py-5 flex justify-center text-lg max-w-prose mx-auto">
              {/* <Breadcrumbs /> */}
            </div>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <div className=" max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {posts.map((post) => (
                <div
                  key={post.name}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={post.image}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      {/* <p className='text-sm font-medium text-indigo-600'>
                  <a href={post.category.href} className='hover:underline'>
                    {post.category.name}
                  </a>
                </p> */}
                      <a
                        href={"http://localhost:3000/posts/" + post.id}
                        className="block mt-2"
                      >
                        <p className="text-xl font-semibold text-gray-900">
                          {post.name}
                        </p>
                        <p
                          className="mt-3 text-base text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: post.seo_description,
                          }}
                        ></p>
                      </a>
                    </div>
                    {/* <div className='mt-6 flex items-center'>
                <div className='flex-shrink-0'>
                  <a href={post.author.href}>
                    <span className='sr-only'>{post.author.name}</span>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={post.author.imageUrl}
                      alt=''
                    />
                  </a>
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-900'>
                    <a href={post.author.href} className='hover:underline'>
                      {post.author.name}
                    </a>
                  </p>
                  <div className='flex space-x-1 text-sm text-gray-500'>
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden='true'>&middot;</span>
                    <span>{post.readingTime} read</span>
                  </div>
                </div>
              </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:4000/blog-settings/category/${context.params.id}`
  );
  const posts = await res.json();
  const resTwo = await fetch(
    `http://localhost:4000/category-settings/${posts[0].category}`
  );

  const category = await resTwo.json();
  return { props: { posts, category } };
}
