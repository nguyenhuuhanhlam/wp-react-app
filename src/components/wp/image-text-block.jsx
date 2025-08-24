import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const ImageTextBlock = ({
  imgSrc,
  imgAlt = "",
  variant = "landscape", // "portrait" | "landscape" | "square" | "banner" | "ultrawide"
  title,
  description,
  imageSize = "sm:w-40", // e.g. "sm:w-48" or number (px)
  textPosition = "side", // "side" | "bottom" | "top" | "overlay"
  overlayPosition = "bottom", // "top" | "center" | "bottom" (khi overlay)

  /** New props for banner-like control **/
  aspectRatio = null, // e.g. '3 / 1' | 3 (CSS aspect-ratio). Nếu có, sẽ override variant
  objectFit = "cover", // 'cover' | 'contain'
  objectPosition = "center", // 'center' | 'top' | 'bottom' | 'left' | 'right'
  rounded = "rounded-none", // bo góc cho container ảnh
  bgClass = "bg-gray-200", // nền khi objectFit='contain' (letterboxing)

  /** NEW: clamp text theo chiều cao ảnh ở layout side **/
  clampToImage = true,
  maxLinesFallback = 4,

  onClick = () => { }
}) => {
  // Bổ sung các tỉ lệ cho banner
  const ratioClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    banner: "aspect-[3/1]",
    ultrawide: "aspect-[21/9]",
  };

  const sizeClass =
    typeof imageSize === "string" ? imageSize : `sm:w-[${imageSize}px]`;

  // object-fit & object-position mapping
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const posMap = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right',
  };
  const posClass = posMap[objectPosition] || 'object-center';

  // Khi dùng aspectRatio prop → dùng CSS aspect-ratio để tránh purge Tailwind
  const containerAspectClass = aspectRatio ? null : (ratioClass[variant] || "");
  const containerStyle = aspectRatio ? { aspectRatio: aspectRatio } : undefined;

  /** Refs & state để tính line clamp động */
  const imgWrapRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [dynClamp, setDynClamp] = useState(maxLinesFallback);

  useEffect(() => {
    if (!(clampToImage && textPosition === 'side')) return;

    const computeClamp = () => {
      const imgH = imgWrapRef.current?.offsetHeight || 0;
      const titleH = titleRef.current?.offsetHeight || 0;
      const descEl = descRef.current;

      if (!imgH || !descEl) return;

      const cs = getComputedStyle(descEl);
      const lineHeight = parseFloat(cs.lineHeight || '0');
      if (!lineHeight) return;

      const available = imgH - titleH;
      const lines = Math.max(0, Math.floor(available / lineHeight));
      setDynClamp(lines || 0);
    };

    const RO = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(computeClamp) : null;

    if (imgWrapRef.current) RO?.observe(imgWrapRef.current);
    if (titleRef.current) RO?.observe(titleRef.current);
    if (descRef.current) RO?.observe(descRef.current);

    window.addEventListener('resize', computeClamp);
    computeClamp();

    return () => {
      RO?.disconnect();
      window.removeEventListener('resize', computeClamp);
    };
  }, [clampToImage, textPosition, maxLinesFallback]);

  // Overlay branch
  if (textPosition === "overlay") {
    const overlayAlign = {
      top: "justify-start",
      center: "justify-center",
      bottom: "justify-end",
    };

    return (
      <div
        className={clsx(
          "relative overflow-hidden w-full",
          bgClass,
          rounded,
          containerAspectClass
        )}
        style={containerStyle}
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className={clsx("absolute inset-0 w-full h-full cursor-pointer", fitClass, posClass)}
        />

        <div
          className={clsx(
            "absolute inset-0 bg-black/20 flex flex-col p-4 text-white",
            overlayAlign[overlayPosition]
          )}
        >
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  // side, top, bottom branch
  return (
    <div
      className={clsx(
        "flex gap-4 items-start cursor-pointer hover:text-stone-500 w-full",
        textPosition === "side" ? "flex-row" : "flex-col"
      )}
      onClick={onClick}
    >
      {textPosition === "top" && (
        <div className="flex flex-col justify-center mb-2 sm:mb-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <div
              className="hidden sm:block text-sm text-neutral-500 overflow-hidden text-ellipsis"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}

      {/* Container ảnh */}
      <div
        ref={imgWrapRef}
        className={clsx(
          "relative flex-shrink-0 overflow-hidden cursor-pointer hover:text-stone-500",
          bgClass,
          rounded,
          containerAspectClass,
          textPosition === "side"
            ? clsx("w-1/3", sizeClass)   // mobile: 1/2, desktop: width cố định
            : "w-full"
        )}
        style={containerStyle}
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className={clsx("absolute inset-0 w-full h-full", fitClass, posClass)}
          onClick={onClick}
        />
      </div>

      {(textPosition === "bottom" || textPosition === "side") && (
        <div className="flex flex-col justify-center mt-2 sm:mt-0 overflow-hidden flex-1">
          <h3 ref={titleRef} className="text-lg font-semibold">{title}</h3>
          {description && (
            <div
              ref={descRef}
              className="hidden sm:block text-sm text-neutral-500 overflow-hidden text-ellipsis"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: (clampToImage && textPosition === 'side') ? dynClamp : 2
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageTextBlock
