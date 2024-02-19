import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { Updater, useImmer } from "use-immer";

const useStoreData = () => {
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

  return { files, setFiles };
};

interface IStoreContext {
  files: {
    id: string;
    fileName: string;
    content: string;
  }[];
  setFiles: Updater<
    {
      id: string;
      fileName: string;
      content: string;
    }[]
  >;
}
const StoreContext = React.createContext<IStoreContext | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("context is undefinded");
  return context;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useStoreData();
  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
};
