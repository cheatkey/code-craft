"use client";
import { useImmer } from "use-immer";
import { nanoid } from "nanoid";
import { codeGeneratorWithBash } from "./CodeGenerator.utils";
import CodeEditor from "./CodeEditor";
import { useStore } from "@/app/hooks/useStore";

const CodeGenerator = () => {
  const { files, setFiles } = useStore();
  const updateFile = (
    id: string,
    field: "fileName" | "content",
    value: string
  ) => {
    setFiles((draft) => {
      const current = draft.find((item) => item.id === id);
      if (current) current[field] = value;
    });
  };

  const deleteFile = (id: string) => {
    setFiles((draft) => draft.filter((v) => v.id !== id));
  };

  const addFile = () => {
    setFiles((draft) => {
      draft.push({
        id: nanoid(),
        fileName: "",
        content: "",
      });
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {files.map((file) => {
          return (
            <div
              key={file.id}
              className="bg-dark-800 p-4 flex flex-col gap-4 rounded-lg"
            >
              <div className="flex flex-row gap-3 justify-between">
                <input
                  className="bg-dark-700 rounded-md px-4 py-2"
                  value={file.fileName}
                  onChange={(e) => {
                    updateFile(file.id, "fileName", e.target.value);
                  }}
                  placeholder="./test/example.ts"
                ></input>
                <button
                  className="text-red-900 bg-red-300 hover:bg-red-400 font-bold px-4 py-2 rounded-xl transition-colors"
                  onClick={() => {
                    deleteFile(file.id);
                  }}
                >
                  파일 삭제
                </button>
              </div>

              <CodeEditor
                code={file.content}
                setCode={(code) => {
                  updateFile(file.id, "content", code);
                }}
              />
            </div>
          );
        })}

        <button
          className="bg-dark-800 px-44 py-4 rounded-lg hover:bg-dark-700 transition-colors"
          onClick={() => {
            addFile();
          }}
        >
          파일 추가하기
        </button>
      </div>
    </div>
  );
};

export default CodeGenerator;
