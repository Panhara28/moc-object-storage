import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes, SerializedEditorState } from "lexical";

export async function convertHTMLtoLexicalJSON(htmlString: string) {
  if (!htmlString || typeof htmlString !== "string") {
    return defaultEmptyLexicalState();
  }

  try {
    // Create an in-memory Lexical editor to parse HTML → JSON
    const { createEditor } = await import("lexical");
    const editor = createEditor();

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, "text/html");

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear();
      $insertNodes(nodes);
    });

    // Return Lexical JSON
    return editor.getEditorState().toJSON();
  } catch (err) {
    console.error("❌ convertHTMLtoLexicalJSON failed:", err);
    return defaultEmptyLexicalState();
  }
}

export const defaultEmptyLexicalState = (): SerializedEditorState => ({
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: null,
    children: [
      {
        type: "paragraph",
        version: 1,
      },
    ],
  },
});
