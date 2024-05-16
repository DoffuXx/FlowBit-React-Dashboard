/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

type Props = {
  data: string;
  handleInputChangeContent: (e: any, editor: any) => void;
};

const CkEditorComponante = ({ data, handleInputChangeContent }: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={handleInputChangeContent}
    />
  );
};

export default CkEditorComponante;
