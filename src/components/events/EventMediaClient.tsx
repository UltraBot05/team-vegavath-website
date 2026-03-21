"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { GalleryItem } from "@/types/gallery";

type Props = {
  items: GalleryItem[];
  eventTitle: string;
};

function getYouTubeId(url: string) {
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

export default function EventMediaClient({ items, eventTitle }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsCustomCursorEnabled(!isTouch && localStorage.getItem("racing-cursor") !== "false");
  }, []);

  const imageItems = items.filter((item) => item.type === "image");

  const slides = imageItems.map((item) => ({
    src: item.url,
    alt: item.caption || `${eventTitle} photo`,
  }));

  const openLightbox = useCallback((imageIndex: number) => {
    setLightboxIndex(imageIndex);
  }, []);

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem", width: "100%" }}>
        {items.map((item, index) => {
          const videoId = item.type === "video" ? getYouTubeId(item.url) : null;
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : item.thumbnail_url;

          const imageIndex = item.type === "image"
            ? imageItems.findIndex((img) => img.id === item.id)
            : -1;

          return (
            <article
              key={item.id}
              onClick={() => {
                if (item.type === "image") openLightbox(imageIndex);
                else if (item.url) setActiveVideo(item.url);
              }}
              style={{ overflow: "hidden", borderRadius: "0.75rem", border: "1px solid #2a2a2a", background: "#1a1a1a", cursor: "pointer", position: "relative" }}
              className="group"
            >
              {item.type === "image" ? (
                <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                  <Image
                    src={item.url}
                    alt={item.caption || `${eventTitle} photo`}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.3s" }}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }} className="group-hover:bg-black/30">
                    <span style={{ opacity: 0, color: "white", fontSize: "2rem", transition: "opacity 0.3s" }} className="group-hover:opacity-100">⊕</span>
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative", aspectRatio: "16/9", width: "100%", background: "#1a1a1a" }}>
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={item.caption || "Video thumbnail"}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "2.5rem", color: "white" }}>▶</span>
                  </div>
                </div>
              )}
              {item.caption ? (
                <p style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem", color: "#9a9a9a" }}>{item.caption}</p>
              ) : null}
            </article>
          );
        })}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)", zIndex: 99999 } }}
      />

      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.9)" }}
        >
          <button
            onClick={() => setActiveVideo(null)}
            style={{ position: "absolute", top: "1.25rem", right: "1.25rem", color: "white", fontSize: "1.5rem", background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", aspectRatio: "9/16", width: "90vw", maxWidth: "500px" }}
          >
            <iframe
              src={activeVideo}
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
