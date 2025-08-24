import clsx from 'clsx'

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

  onClick = () => { }
}) => {
  // Bổ sung các tỉ lệ cho banner
  const ratioClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    banner: "aspect-[3/1]",       // banner ngang, cao thấp
    ultrawide: "aspect-[21/9]",   // tỉ lệ ultrawide/panorama
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
      >
        {/* Ảnh */}
        <img
          src={imgSrc}
          alt={imgAlt}
          className={clsx("absolute inset-0 w-full h-full", fitClass, posClass)}
          onClick={onClick}
        />

        {/* Overlay text */}
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
        "flex gap-4 items-start",
        textPosition === "side" ? "flex-col sm:flex-row" : "flex-col"
      )}
    >
      {textPosition === "top" && (
        <div className="flex flex-col justify-center mb-2 sm:mb-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <div
              className="hidden sm:block text-sm text-neutral-500 overflow-hidden"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}

      {/* Container ảnh (ép tỉ lệ banner/ultrawide nếu cần) */}
      <div
        className={clsx(
          "relative flex-shrink-0 overflow-hidden",
          bgClass,
          rounded,
          containerAspectClass,
          textPosition === "side" ? sizeClass : "w-full"
        )}
        style={containerStyle}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className={clsx("absolute inset-0 w-full h-full", fitClass, posClass)}
          onClick={onClick}
        />
      </div>

      {(textPosition === "bottom" || textPosition === "side") && (
        <div className="flex flex-col justify-center mt-2 sm:mt-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <div
              className="hidden sm:block text-sm text-neutral-500 overflow-hidden"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageTextBlock
