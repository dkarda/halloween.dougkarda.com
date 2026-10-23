import { useEffect, useRef } from "react";

export default function Lightbox({ image, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();

    const onCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={image.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <picture>
          {image.webp ? <source srcSet={image.webp} type="image/webp" /> : null}
          <img
            src={image.fallback || image.jpg}
            alt={image.alt}
            className="max-h-[82vh] max-w-[min(1100px,92vw)] bg-black object-contain"
          />
        </picture>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer border-y border-ember px-4 py-1 text-sm font-semibold tracking-[0.2em] text-ember uppercase hover:bg-ember hover:text-night"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
