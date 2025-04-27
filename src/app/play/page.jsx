"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PlayContent() {
  const searchParams = useSearchParams();
  const iframeRef = useRef(null);

  const [urlEmbed, setUrlEmbed] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const idParam = searchParams.get("id");
    const embedParam = searchParams.get("embed");
    const titleParam = searchParams.get("title");

    setId(idParam);
    setUrlEmbed(decodeURIComponent(embedParam || ""));
    setTitle(decodeURIComponent(titleParam || ""));

    fetch("/data/tvChannels.json")
      .then((response) => response.json())
      .then((data) => setChannels(data))
      .catch((error) => console.error("Error fetching channels:", error));
  }, [searchParams]);

  return (
    <div className="p-4 mt-12">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col shadow-lg p-5">
          {urlEmbed ? (
            <div
              className="relative w-full h-[40vh] md:h-[80vh]"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                ref={iframeRef}
                src={urlEmbed}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
          ) : (
            <p>Video tidak tersedia.</p>
          )}
          <h1 className="text-xl font-bold mt-4 text-center">{title}</h1>
        </div>
        <div className="w-full md:w-[180px] md:h-[80vh] flex flex-col mt-5 mb-10">
          <h2 className="text-lg font-semibold mb-2">TV Lainnya</h2>
          <div className="flex md:flex-col flex-row overflow-x-auto md:overflow-y-auto space-x-4 md:space-x-0 md:space-y-4 py-2">
            {channels
              .filter((channel) => channel.id !== parseInt(id))
              .map((channel) => (
                <div
                  key={channel.id}
                  className="min-w-[120px] md:min-w-0 bg-white shadow-md rounded-md p-2 flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    window.location.href = `/play?id=${
                      channel.id
                    }&embed=${encodeURIComponent(
                      channel.urlEmbed
                    )}&title=${encodeURIComponent(channel.title)}`;
                  }}
                >
                  <div
                    className="w-30 h-20 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${channel.logoPath})` }}
                  ></div>
                  <p className="mt-2 text-center text-sm font-medium text-slate-700">
                    {channel.title}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Play() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      }
    >
      <PlayContent />
    </Suspense>
  );
}
