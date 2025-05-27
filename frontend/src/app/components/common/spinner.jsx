import cn from "classnames";
import { CgSpinner } from "react-icons/cg";

export default function Spinner({ sm, md, lg }) {
  const className = cn("animate-spin text-white-300 fill-white-300 mr-2", {
    "w-4 h-4": sm,
    "w-6 h-6": md,
    "w-8 h-8": lg,
  });
  return (
    <div role="status">
      <CgSpinner className={className} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
