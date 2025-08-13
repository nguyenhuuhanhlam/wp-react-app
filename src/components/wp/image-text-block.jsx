import clsx from "clsx";

const ImageTextBlock = ({
  imgSrc,
  imgAlt = "",
  variant = "landscape", // "portrait", "landscape", "square"
  title,
  description,
  imageSize = "sm:w-40" // có thể là "sm:w-48" hoặc số px
}) => {
  const ratioClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square"
  };

  const sizeClass =
    typeof imageSize === "string"
      ? imageSize
      : `sm:w-[${imageSize}px]`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      {/* Ảnh */}
      <div
        className={clsx(
          "flex-shrink-0 overflow-hidden bg-gray-200",
          ratioClass[variant],
          "w-full",
          sizeClass
        )}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ImageTextBlock;
