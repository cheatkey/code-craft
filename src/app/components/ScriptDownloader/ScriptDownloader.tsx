import { useStore } from "@/app/hooks/useStore";
import Image from "next/image";
import BashIcon from "@/assets/bash.png";
import PowershellIcon from "@/assets/powershell.png";
import { downloadTextFile } from "./DownloadFile";
import {
  codeGeneratorWithBash,
  codeGeneratorWithPowershell,
} from "../CodeGenerator/CodeGenerator.utils";
import { copyTextToClipboard } from "./Clipboard";

const ScriptDownloader = () => {
  const { files } = useStore();

  const buttonMenu = [
    {
      icon: BashIcon,
      name: "bash",
      exampleCommand: `curl -s "파일 URL" | bash`,
      handleClick: () => {
        downloadTextFile(codeGeneratorWithBash(files), "codeCraft.sh");
      },
    },
    {
      icon: PowershellIcon,
      name: "powershell",
      exampleCommand: `$ScriptUrl = "파일 URL"\nInvoke-Expression (Invoke-WebRequest -Uri $ScriptUrl).Content`,
      handleClick: () => {
        downloadTextFile(codeGeneratorWithPowershell(files), "codeCraft.ps1");
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {buttonMenu.map(({ icon, name, exampleCommand, handleClick }) => (
        <div className="flex flex-row items-center gap-4" key={name}>
          <button
            onClick={handleClick}
            className="bg-blue-200 text-blue-900 text-lg justify-center gap-4 font-bold hover:bg-blue-300 px-4 py-2 rounded-lg transition-colors flex flex-row"
          >
            <Image width={24} height={24} src={icon} alt="bash icon" />
            {name} 스크립트 다운로드
          </button>

          <span
            className="bg-dark-800 hover:bg-dark-700 transition-colors p-4 rounded-xl whitespace-break-spaces cursor-pointer"
            onClick={() => {
              copyTextToClipboard(exampleCommand);
            }}
          >
            {exampleCommand}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScriptDownloader;
