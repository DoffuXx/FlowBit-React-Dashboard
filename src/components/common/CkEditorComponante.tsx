import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

type Props = {
  data: string;
  handleInputChangeContent: (e: any, editor: any) => void;
};

const CkEditorComponante = ({ data, handleInputChangeContent }: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onInit={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={handleInputChangeContent}
    />
  );
};

export default CkEditorComponante;
