"use client";
import CodeGenerator from "./components/CodeGenerator/CodeGenerator";
import ScriptDownloader from "./components/ScriptDownloader/ScriptDownloader";
import { StoreProvider } from "./hooks/useStore";

export default function Home() {
  return (
    <StoreProvider>
      <main className="bg-dark-900 text-dark-100 min-h-screen p-6 flex flex-col gap-6">
        <h2 className="text-dark-200 text-3xl font-bold">1. 파일 내용 입력</h2>

        <CodeGenerator />

        <h2 className="text-dark-200 text-3xl font-bold">
          2. 파일 제작 스크립트 다운로드
        </h2>

        <ScriptDownloader />
      </main>
    </StoreProvider>
  );
}
