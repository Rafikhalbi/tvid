"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListTv = () => {
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch("/data/tvChannels.json")
      .then((response) => response.json())
      .then((data) => setChannels(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleClick = (id, urlEmbed, title) => {
    router.push(
      `/play?id=${id}&embed=${encodeURIComponent(
        urlEmbed
      )}&title=${encodeURIComponent(title)}`
    );
  };

  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-5 grid-cols-2 gap-20">
        {channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() =>
              handleClick(channel.id, channel.urlEmbed, channel.title)
            }
            className="shadow-md w-36 h-36 flex flex-col justify-center items-center rounded-md cursor-pointer"
          >
            <div
              style={{ backgroundImage: `url(${channel.logoPath})` }}
              className="w-36 h-20 bg-cover bg-center"
            ></div>
            <h2 className="font-semibold text-slate-600">{channel.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTv;
