"use client";
import { useImmer } from "use-immer";
import { nanoid } from "nanoid";
import { codeGeneratorWithBash } from "./CodeGenerator.utils";

const CodeGenerator = () => {
  const [files, setFiles] = useImmer<
    {
      id: string;
      fileName: string;
      content: string;
    }[]
  >([
    {
      id: nanoid(),
      fileName: "",
      content: "",
    },
  ]);

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
      <div>
        {files.map((file) => {
          return (
            <div key={file.id} className="bg-dark-800 p-6 flex flex-col gap-4">
              <div className="flex flex-row gap-3">
                <input
                  className="bg-dark-700 rounded-md px-4 py-2"
                  value={file.fileName}
                  onChange={(e) => {
                    updateFile(file.id, "fileName", e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    deleteFile(file.id);
                  }}
                >
                  삭제
                </button>
              </div>
              <textarea
                className="bg-dark-700 p-4 rounded-md"
                value={file.content}
                onChange={(e) => {
                  updateFile(file.id, "content", e.target.value);
                }}
              ></textarea>
            </div>
          );
        })}

        <button
          onClick={() => {
            addFile();
          }}
        >
          +
        </button>
      </div>

      <div className="whitespace-break-spaces">
        {codeGeneratorWithBash(files).script}
      </div>
    </div>
  );
};

export default CodeGenerator;
