import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";
import ImagePlaceholder from "./ImagePlaceholder";

function ServiceCard({ title, price, text, image, to = "/services", isCopy = false }) {
  return (
    <article
      data-card
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-tan/40 bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-tan hover:shadow-[0_18px_36px_-16px_rgba(176,159,137,0.65)] motion-reduce:transition-none xl:min-h-[31.25rem]"
    >
      <div className="aspect-[16/7] overflow-hidden">
        <div data-card-image className="h-full w-full">
          <ImagePlaceholder
            src={image}
            alt=""
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7 xl:px-7 xl:pb-8 xl:pt-8">
        <div className="flex items-baseline justify-between gap-3 md:min-h-[3.25rem] min-[1700px]:min-h-0">
          <h3 className="xl:text-[1.25rem]">{title}</h3>
          {price && <span className="text-small shrink-0 whitespace-nowrap text-tan">{price}</span>}
        </div>

        <p className="text-small mt-4 leading-[1.6] xl:mt-5">{text}</p>

        <Link
          to={to}
          tabIndex={isCopy ? -1 : undefined}
          aria-label={`See more about ${title}`}
          className="text-ui relative mt-auto inline-flex w-fit items-center gap-2 pt-6 text-tan after:absolute after:bottom-[-0.125rem] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 focus-visible:after:scale-x-100 group-hover:text-ink"
        >
          See more
          <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
