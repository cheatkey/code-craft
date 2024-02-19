export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);

    window.alert("클립보드에 복사 완료");
  } catch (err) {
    window.alert("클립보드에 복사 실패");
  }
};
