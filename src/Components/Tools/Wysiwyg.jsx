import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Wysiwyg = (props) => {
  return (
    <SunEditor
      setOptions={{
        buttonList: [
          // default
          ["undo", "redo"],
          [
            ":p-More Paragraph-default.more_paragraph",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
          ],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          [
            "-right",
            ":i-More Misc-default.more_vertical",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
          ],
          ["-right", ":r-More Rich-default.more_plus", "table"],
          ["-right", "image", "video", "audio", "link"],
          // (min-width: 992)
          [
            "%992",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              ["bold", "underline", "italic", "strike"],
              [
                ":t-More Text-default.more_text",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
              ],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
              ],
              [
                "-right",
                ":r-More Rich-default.more_plus",
                "table",
                "link",
                "image",
                "video",
                "audio",
              ],
            ],
          ],
          // (min-width: 767)
          [
            "%767",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              [
                ":t-More Text-default.more_text",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
              ],
              ["removeFormat"],
              ["outdent", "indent"],
              [
                ":e-More Line-default.more_horizontal",
                "align",
                "horizontalRule",
                "list",
                "lineHeight",
              ],
              [":r-More Rich-default.more_plus", "table", "link", "image", "video", "audio"],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
              ],
            ],
          ],
          // (min-width: 480)
          [
            "%480",
            [
              ["undo", "redo"],
              [
                ":p-More Paragraph-default.more_paragraph",
                "font",
                "fontSize",
                "formatBlock",
                "paragraphStyle",
                "blockquote",
              ],
              [
                ":t-More Text-default.more_text",
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "fontColor",
                "hiliteColor",
                "textStyle",
                "removeFormat",
              ],
              [
                ":e-More Line-default.more_horizontal",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "lineHeight",
              ],
              [":r-More Rich-default.more_plus", "table", "link", "image", "video", "audio"],
              [
                "-right",
                ":i-More Misc-default.more_vertical",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
              ],
            ],
          ],
        ],
      }}
      {...props}
      className="h-2"
    />
  );
};

export default Wysiwyg;
