import { useState, useEffect } from "react";

export default function BlogOne() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/blog-settings/favorite")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  });

  return (
    <div className="bg-white pt-16 px-4 sm:px-6  lg:pb-28 lg:px-8">
      <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
        {posts.length === 5 ? (
          <div className=" grid gap-16  lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            <div className="grid content-center gap-6">
              <a href={"/posts/" + posts[0].id}>
                <img
                  className="w-full h-48 rounded-md	"
                  src="https://via.placeholder.com/200"
                />
              </a>
              <a href={"/posts/" + posts[1].id}>
                <img
                  className="w-full h-48 rounded-md	"
                  src="https://via.placeholder.com/200"
                />
              </a>
            </div>
            <div>
              <a href={"/posts/" + posts[2].id}>
                <img
                  className="w-full h-auto rounded-md	"
                  src="https://via.placeholder.com/400"
                />
              </a>
            </div>
            <div className="grid content-center gap-6">
              <a href={"/posts/" + posts[3].id}>
                <img
                  className="w-full h-48 rounded-md	"
                  src="https://via.placeholder.com/200"
                />
              </a>
              <a href={"/posts/" + posts[4].id}>
                <img
                  className="w-full h-48 rounded-md	"
                  src="https://via.placeholder.com/200"
                />
              </a>
            </div>
          </div>
        ) : (
          <div>5 tane favori yazınız yok!</div>
        )}
      </div>
    </div>
  );
}
