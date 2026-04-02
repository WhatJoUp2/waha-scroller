import { useMemo, type FC } from "react";
import sanitize from "sanitize-html";

export interface ParseMarkdownProps {
  markdown: string;
}

export const ParseMarkdown: FC<ParseMarkdownProps> = ({ markdown }) => {
  let html = useMemo(
    () =>
      sanitize(
        markdown
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\^\^(.*?)\^\^/g, "<span class='smallcaps'>$1</span>")
          .replace(/\*(.*?)\*/g, "<i>$1</i>")
          .replace(/\n(.*?)/g, "<br>$1"),
      ),
    [markdown],
  );

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};
