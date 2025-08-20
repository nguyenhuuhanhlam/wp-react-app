import clsx from 'clsx'

const ImageTextBlock = ({
  imgSrc,
  imgAlt = "",
  variant = "landscape", // "portrait", "landscape", "square"
  title,
  description,
  imageSize = "sm:w-40", // "sm:w-48" hoặc số px
  textPosition = "side", // "side" | "bottom" | "top" | "overlay"
  overlayPosition = "bottom", // "top" | "center" | "bottom" (khi overlay)
}) => {
  const ratioClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  };

  const sizeClass =
    typeof imageSize === "string" ? imageSize : `sm:w-[${imageSize}px]`;

  // Nếu overlay
  if (textPosition === "overlay") {
    const overlayAlign = {
      top: "justify-start",
      center: "justify-center",
      bottom: "justify-end",
    };

    return (
      <div
        className={clsx(
          "relative overflow-hidden bg-gray-200 w-full", // full width
          ratioClass[variant]
        )}
      >
        {/* Ảnh cover */}
        <img
          src={imgSrc}
          alt={imgAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay text */}
        <div
          className={clsx(
            "absolute inset-0 bg-black/40 flex flex-col p-4 text-white",
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

  // side, top, bottom
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
              className="hidden sm:block text-sm text-gray-500 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}

      <div
        className={clsx(
          "relative flex-shrink-0 overflow-hidden bg-gray-200",
          ratioClass[variant],
          textPosition === "side" ? sizeClass : "w-full" // nếu side thì giữ size, còn lại full width
        )}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {(textPosition === "bottom" || textPosition === "side") && (
        <div className="flex flex-col justify-center mt-2 sm:mt-0">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <div
              className="hidden sm:block text-sm text-red-500 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageTextBlock;
