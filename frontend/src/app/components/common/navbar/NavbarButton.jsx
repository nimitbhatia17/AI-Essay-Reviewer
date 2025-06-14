import Link from "next/link";

export default function NavbarButton({
  hrefString,
  onClickHandler,
  displayText,
}) {
  return (
    <Link href={hrefString} onClick={onClickHandler}>
      <div className="bg-black w-35 text-center hover:bg-gray-100 hover:border-1 hover:border-black hover:text-black text-white font-poppins font-extrabold py-4 px-4 mx-3 transition duration-400">
        {displayText}
      </div>
    </Link>
  );
}
