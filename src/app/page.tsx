import Link from "next/link";

export default function Home() {
  return (
<div className="flex justify-center items-center w-screen h-screen flex-col text-3xl ">

<Link href="/register" className="py-4 px-8 border-2 border-red-400">
       REJESTRACJA
      </Link>
      <Link href="/login" className="py-4 px-8 border-2 border-red-400 mt-4">
      LOGOWANIE
      </Link>
</div>
  );
}
