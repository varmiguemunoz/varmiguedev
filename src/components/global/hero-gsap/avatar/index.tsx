export default function Avatar() {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-sm">
      <img
        src="/profilev2.png"
        alt="Logo"
        width={500}
        height={500}
        loading="lazy"
        className="h-[500px] w-full object-cover object-top"
        id="banner-image"
      />
    </div>
  );
}
