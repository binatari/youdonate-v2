import React, { useEffect, useRef, useState } from "react";

const TryEditor = ({ data, setData }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Essentials } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      
      // Essentials: require('@ckeditor/ckeditor5-essentials/src/essentials'),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <div className="mb-8">
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={data}
          // config={{
          //   heading: {
          //     options: [
          //       {
          //         model: "paragraph",
          //         title: "Paragraph",
          //         class: "ck-heading_paragraph",
          //       },
          //       {
          //         model: "heading1",
          //         view: "h1",
          //         title: "Heading 1",
          //         class: "ck-heading_heading1",
          //       },
          //       {
          //         model: "heading2",
          //         view: "h2",
          //         title: "Heading 2",
          //         class: "ck-heading_heading2",
          //       },
          //     ],
          //   },
          //   // toolbar: ["bold", "italic"],
          // }}
          height={"500px"}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default TryEditor;
