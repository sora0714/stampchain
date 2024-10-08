import { get_suffix_from_mimetype } from "$lib/utils/util.ts";

export const Stamp = (
  { stamp, className }: { stamp: StampRow; className: string },
) => {
  if (stamp.stamp_mimetype === "text/html") {
    return (
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        class={`rounded-lg ${className} `}
        sandbox="allow-scripts "
        src={`/content/${stamp.tx_hash}.${
          get_suffix_from_mimetype(stamp.stamp_mimetype)
        }`}
        onError={(e) => {
          e.currentTarget.src = stamp.stamp_url;
        }}
        alt="Stamp"
      />
    );
  }
  if (!stamp.stamp_mimetype) {
    return (
      <img
        width="100%"
        class={`max-w-none object-contain image-rendering-pixelated rounded-lg ${className} `}
        src={`/not-available.png`}
        onError={(e) => {
          e.currentTarget.src = `/not-available.png`;
        }}
        alt="Stamp"
      />
    );
  }
  return (
    <img
      width="100%"
      loading="lazy"
      class={`max-w-none object-contain image-rendering-pixelated rounded-lg ${className} `}
      src={`/content/${stamp.tx_hash}.${
        get_suffix_from_mimetype(stamp.stamp_mimetype)
      }`}
      onError={(e) => {
        e.currentTarget.src = `/content/not-available.png`;
      }}
      alt="Stamp"
    />
  );
};
export default Stamp;
