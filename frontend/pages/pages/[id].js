import Breadcrumbs from "../../components/breadcrumbs";
import Head from "next/head";

export default function PageDetails({ pages, category }) {
  return (
    <>
      <div className="relative py-16 bg-white overflow-hidden">
        <Head>
          <title>{pages.pageName}</title>
          <meta property="og:title" content={pages.seoTitle} />
          <meta property="og:description" content={pages.seoDescription} />
        </Head>
        <div className=" max-w-7xl mx-auto px-2 sm:px-6 lg:px-8relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {pages.pageName}
              </span>
            </h1>
            <div className="py-5 flex justify-center text-lg max-w-prose mx-auto">
              {/* <Breadcrumbs /> */}
            </div>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <div dangerouslySetInnerHTML={{ __html: pages.content }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:4000/page-settings/${context.params.id}`
  );
  const pages = await res.json();
  return { props: { pages } };
}
