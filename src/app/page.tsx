"use client";
import Image from "next/image";
import CodeGenerator from "./components/CodeGenerator/CodeGenerator";
import ScriptDownloader from "./components/ScriptDownloader/ScriptDownloader";
import { StoreProvider } from "./hooks/useStore";
import Logo from "@/assets/logo.png";
import GithubCorner from "./components/GithubCorner/GithubCorner";

export default function Home() {
  return (
    <StoreProvider>
      <GithubCorner />

      <div className="bg-dark-900 flex justify-center min-h-screen text-dark-100">
        <main className="p-6 flex flex-col gap-6 w-full max-w-[1200px]">
          <div className="flex w-full justify-center">
            <Image src={Logo} width={256} alt="logo image" />
          </div>

          <h2 className="text-dark-200 text-3xl font-bold">
            1. 파일 내용 입력
          </h2>

          <CodeGenerator />

          <h2 className="text-dark-200 text-3xl font-bold">
            2. 파일 제작 스크립트 다운로드
          </h2>

          <ScriptDownloader />
        </main>
      </div>
    </StoreProvider>
  );
}
