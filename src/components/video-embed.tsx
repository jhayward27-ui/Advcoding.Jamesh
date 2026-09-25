type VideoEmbedProps = {
  youtubeId: string;
  title: string;
};

export function VideoEmbed({ youtubeId, title }: VideoEmbedProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="border-t border-white/10 px-4 py-3 text-sm text-white/70">
        {title}
      </div>
    </div>
  );
}
