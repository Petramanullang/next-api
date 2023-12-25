import Link from "next/link";
import React from "react";

const ITEMS_PER_PAGE = 12;

interface AlbumData {
  userId: number;
  id: number;
  title: string;
}

interface Props {
  albumData: AlbumData[];
  page: number;
  totalAlbums: number;
}

export async function getServerSideProps({ query }: any) {
  const page = query.page ? parseInt(query.page as string) : 1;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${ITEMS_PER_PAGE}`
  );
  const albumData: AlbumData[] = await res.json();

  const totalRes = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const totalAlbums: AlbumData[] = await totalRes.json();
  return { props: { albumData, page, totalAlbums: totalAlbums.length } };
}

const HomePage: React.FC<Props> = ({ albumData, page, totalAlbums }) => {
  const totalPages = Math.ceil(totalAlbums / ITEMS_PER_PAGE);

  return (
    <div className="p-5 overflow-hidden">
      <h1 className="text-4xl text-center text-white font-bold">HomePage</h1>

      {/* Card Album */}
      <div className="grid grid-cols-4 p-16 place-items-center gap-5 h-[600px]">
        {albumData.map((album) => (
          <div key={album.id}>
            <Link href={`/albums/${album.id}`} passHref>
              <div className="cursor-pointer">
                <div className="w-60 h-36 p-5 bg-white shadow-lg border-gray-200 rounded-lg dark:bg-gray-800 dar hover:-translate-y-2 ease-in-out transition-transform duration-300 ">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {album.id}
                  </h5>
                  <p className="mb-3 text-xs font-normal text-gray-500 dark:text-gray-400">
                    {album.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-3">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <p className="p-3 ml-1 bg-blue-500 text-white rounded">Previous</p>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/?page=${page + 1}`}>
            <p className="p-3 ml-1 bg-blue-500 text-white rounded">Next</p>
          </Link>
        )}
      </div>
      <div className="flex justify-center mt-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link key={i + 1} href={`/?page=${i + 1}`}>
            <p
              className={`p-3 mx-1 rounded ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}>
              {i + 1}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
