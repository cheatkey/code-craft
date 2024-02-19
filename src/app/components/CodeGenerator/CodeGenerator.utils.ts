export const codeGeneratorWithBash = (
  files: { fileName: string; content: string }[]
) => {
  const stack: string[] = [];

  files.forEach((file) => {
    const { fileName, content } = file;
    const hasDirectory = fileName.split("/").length - 1 >= 2;

    if (hasDirectory) {
      const folder = fileName.substring(0, fileName.lastIndexOf("/"));
      stack.push(`mkdir -p "${folder}"`);
      stack.push(``);
    }

    stack.push(`touch "${file.fileName}"`);
    stack.push(``);

    const [firstLine, ...otherLines] = content
      .split("\n")
      .map((v) => v.replaceAll("'", "'\\''"));
    stack.push(`echo '${firstLine}' > "${fileName}"`);

    otherLines.forEach((text) => {
      stack.push(`echo '${text}' >> "${fileName}"`);
    });

    stack.push(``);
    stack.push(`echo '${fileName} file generated'`);
    stack.push(``);
  });

  return stack.join("\n");
};

export const codeGeneratorWithPowershell = (
  files: { fileName: string; content: string }[]
) => {
  const stack: string[] = [];

  files.forEach((file) => {
    const { fileName, content } = file;
    const hasDirectory = fileName.split("/").length - 1 >= 2;

    if (hasDirectory) {
      const folder = fileName
        .substring(0, fileName.lastIndexOf("/"))
        .replace(/\//g, "\\");
      stack.push(`New-Item -ItemType Directory -Path "${folder}" -Force`);
      stack.push(``);
    }

    stack.push(
      `New-Item -Path "${fileName.replace(/\//g, "\\")}" -ItemType File -Force`
    );
    stack.push(``);

    content.split("\n").forEach((line, index) => {
      const escapedLine = line.replace(/"/g, '`"');
      const cmd = index === 0 ? "Set-Content" : "Add-Content";
      stack.push(
        `${cmd} -Path "${fileName.replace(
          /\//g,
          "\\"
        )}" -Value "${escapedLine}" -Encoding UTF8`
      );
    });

    stack.push(``);
    stack.push(`Write-Host "${fileName} file generated"`);
    stack.push(``);
  });

  const BOM = "\uFEFF";
  const contentWithBOM = BOM + stack.join("\n");

  return contentWithBOM;
};
