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

  return {
    script: stack.join("\n"),
    command: "curl -s https://gist.githubusercontent.com/hello.sh | bash",
  };
};
