import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { VinylRecordItem } from '../../data/subAestheticsData';

interface Props {
  record: VinylRecordItem;
  primaryColor: string;
}

/**
 * The cover-flow is an image archive, not an illustration gallery.  This
 * deliberately has no title-based SVG branches: a product name must never
 * silently turn a real reference photo into a synthetic approximation.
 */
export const RealAestheticArt: React.FC<Props> = ({ record, primaryColor }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center text-white"
        style={{ background: `linear-gradient(145deg, ${primaryColor} 0%, #0f172a 70%)` }}
      >
        <ImageOff className="w-8 h-8 opacity-80" aria-hidden="true" />
        <p className="text-xs font-medium">Reference image unavailable</p>
        <p className="text-[10px] leading-relaxed text-white/70">{record.title}</p>
      </div>
    );
  }

  return (
    <figure className="w-full h-full relative m-0 bg-slate-950">
      <img
        src={record.coverImage}
        alt={`${record.title} — photographic reference`}
        className="w-full h-full object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
      {record.sourceUrl ? (
        <a
          href={record.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/55 px-2 py-1 text-[9px] font-mono tracking-[0.14em] text-white/90 backdrop-blur-md transition-colors hover:bg-black/80"
          aria-label={`Open source for ${record.title}`}
        >
          SOURCE ↗
        </a>
      ) : (
        <figcaption className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/55 px-2 py-1 text-[9px] font-mono tracking-[0.14em] text-white/90 backdrop-blur-md">
          PHOTO REFERENCE
        </figcaption>
      )}
    </figure>
  );
};
