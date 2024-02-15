import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-dark-900 text-dark-100 min-h-screen p-6">
      <div className="grid grid-cols-5 gap-3">
        {Array(10)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="bg-dark-800 text-dark-200 p-5 rounded-2xl flex flex-col gap-2"
            >
              <p className="font-semibold text-xl tracking-tight">
                ESM에서 __dirname 사용하는 방법
              </p>
              <span className="text-dark-300 text-base">
                ReferenceError: __dirname is not defined in ES module scope
              </span>

              <div className="flex flex-row">
                {["nodejs"].map((tag) => (
                  <span
                    className="bg-dark-700 text-dark-300 font-bold text-sm px-2 py-1 rounded-lg"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
