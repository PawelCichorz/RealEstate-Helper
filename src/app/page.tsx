import Link from "next/link";

export default function Home() {
  return (
<div className="flex justify-center items-center w-screen h-screen flex-col text-3xl text-center ">

<Link href="/register" className="py-4 px-8 border-2 border-red-400 w-[300px]">
       REJESTRACJA
      </Link>
      <Link href="/login" className="py-4 px-8 border-2 border-red-400 mt-4 w-[300px]">
      LOGOWANIE
      </Link>
</div>
  );
}
