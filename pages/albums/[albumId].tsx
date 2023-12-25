// [albumId].tsx
"use client";
import React from "react";
import Image from "next/image";

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();

  const albumIds = albums.map((album: any) => ({
    params: { albumId: `${album.id}` },
  }));

  return {
    paths: albumIds,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { albumId } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  const photos = await response.json();

  return {
    props: { photos },
  };
}

const AlbumDetail = ({ photos }: any) => {
  return (
    <div className="p-5">
      <h1 className="text-center text-4xl ">Album Detail</h1>
      <div className="grid grid-cols-3 place-items-center p-10 gap-5">
        {photos.map((photo: any) => (
          <div key={photo.id} className="w-4/6 p-2 max-h-80 rounded-md dark:bg-gray-800">
            <Image
              src={photo.thumbnailUrl}
              alt={photo.title}
              width={150}
              height={150}
              className="mx-auto border rounded-lg"
            />
            <div className="p-2 flex flex-col  justify-center">
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">{photo.title}</p>
              <a
                href={photo.url}
                className="text-xs text-center font-bold my-5 text-blue-500 bg-gray-700  p-2 rounded shadow-md hover:text-white">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;
