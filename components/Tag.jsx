export default function Tag({ tag, icon, className }) {
  return (
    <div
      key={tag}
      className={` ${className} backdrop-blur-sm text-xs px-2 py-1 xl:text-sm xl:px-4 xl:py-2 rounded-full flex items-center gap-2`}
    >
      <span className="capitalize">
        {tag}
      </span>

      {icon &&icon}
    </div>
  );
}
