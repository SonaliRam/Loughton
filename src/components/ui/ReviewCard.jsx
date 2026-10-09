function ReviewCard({ title, text, name, role }) {
  // the last word and the closing mark stay together so the mark never sits alone
  const words = title.split(" ");
  const lastWord = words.pop();

  return (
    <figure className="group flex w-full flex-col rounded-box border border-tan/40 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-tan hover:shadow-[0_18px_36px_-18px_rgba(176,159,137,0.6)] md:p-10 xl:p-[4.375rem]">
      <blockquote>
        <h3 className="relative text-body text-[1.375rem] md:text-[1.75rem] xl:text-[2.25rem]">
          <span
            data-quote
            aria-hidden="true"
            className="mr-1 inline-block text-tan xl:absolute xl:-left-[1.75rem] xl:top-0 xl:mr-0"
          >
            “
          </span>
          {words.join(" ")}{" "}
          <span className="whitespace-nowrap">
            {lastWord}
            <span data-quote aria-hidden="true" className="ml-1 inline-block text-tan">
              ”
            </span>
          </span>
        </h3>
        <p className="text-lead mt-5 max-w-[48rem] xl:mt-[3.75rem]">{text}</p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 xl:mt-auto xl:pt-[3.75rem]">
        <span
          aria-hidden="true"
          className="flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center rounded-full bg-tan text-[1.25rem] text-white transition-transform duration-300 group-hover:scale-105"
        >
          {name.charAt(0)}
        </span>
        <div>
          <p className="text-lead text-body">{name}</p>
          <p className="text-small">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default ReviewCard;
