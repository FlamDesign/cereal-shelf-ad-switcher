type FlickSlotProps = {
  src: string;
  title: string;
  videoSrc?: string;
  onEnded: () => void;
};

/** Native media supports ended events; existing cross-origin Flicks embeds do not. */
export function FlickSlot({ src, title, videoSrc, onEnded }: FlickSlotProps) {
  return (
    <div id="flick-slot" className="moment-flick-card">
      {videoSrc ? (
        <video key={videoSrc} src={videoSrc} aria-label={title} autoPlay muted playsInline
          onEnded={onEnded} className="moment-video" />
      ) : (
        <iframe key={src} src={src} title={title} className="moment-embed"
          allow="autoplay; fullscreen" />
      )}
    </div>
  );
}