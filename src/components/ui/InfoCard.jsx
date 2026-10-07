function InfoCard({ icon: Icon, title, text }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-tan/40 bg-cream/35 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-tan hover:shadow-[0_14px_30px_-14px_rgba(176,159,137,0.6)] md:p-8 xl:min-h-[16.25rem] xl:px-[2.1875rem] xl:pb-10 xl:pt-12">
      <div className="flex items-center gap-4 xl:min-h-[3.25rem]">
        <Icon className="h-8 w-8 shrink-0 text-body transition-transform duration-300 group-hover:scale-110" />
        <h3 className="text-body xl:text-[1.25rem]">{title}</h3>
      </div>
      <p className="text-small mt-5 leading-[1.4] xl:mt-[2.75rem]">{text}</p>
    </article>
  );
}

export default InfoCard;
