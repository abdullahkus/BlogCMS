import Breadcrumbs from "../../components/breadcrumbs";
import Head from "next/head";

export default function PostDetails({ post, category }) {
  return (
    <>
      <div className="relative py-16 bg-white overflow-hidden">
        <Head>
          <title>{post.name}</title>
          <meta property="og:title" content={post.seo_title} />
          <meta property="og:description" content={post.seo_description} />
          <meta property="article:tag" content={post.keywords} />
        </Head>
        <div className=" max-w-7xl mx-auto px-2 sm:px-6 lg:px-8relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <a href={"/category/" + category.id}>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                  {category.name}
                </span>
              </a>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {post.name}
              </span>
            </h1>
            <div className="py-5 flex justify-center text-lg max-w-prose mx-auto">
              {/* <Breadcrumbs /> */}
            </div>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:4000/blog-settings/${context.params.id}`
  );
  const post = await res.json();
  const resTwo = await fetch(
    `http://localhost:4000/category-settings/${post.category}`
  );
  const category = await resTwo.json();
  return { props: { post, category } };
}
