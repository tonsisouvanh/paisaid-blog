export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      {/* <div className="loader flex aspect-square w-8 animate-spin items-center justify-center rounded-full border-t-2 border-gray-500 bg-gray-300 text-yellow-700"></div> */}
      <div className="relative z-40 flex aspect-square w-32 animate-[spin_3s_linear_infinite] items-center justify-center rounded-full bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:absolute before:z-[80] before:aspect-square before:w-[60%] before:animate-[spin_2s_linear_infinite] before:rounded-full before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:z-[60] after:aspect-square after:w-3/4 after:animate-[spin_3s_linear_infinite] after:rounded-full after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
        <span className="absolute z-[60] aspect-square w-[85%] animate-[spin_5s_linear_infinite] rounded-full bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"></span>
      </div>
    </div>
  );
}
