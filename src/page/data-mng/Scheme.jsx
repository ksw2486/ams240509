import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "react-bootstrap";
import { useSchemeQuery } from "../../hooks/useScheme";

const Scheme = () => {
  const { data } = useSchemeQuery();
  const [schemeData, setSchemeData] = useState("");
  const [editing, setEditing] = useState(false);
  console.log("scheme", data);

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setSchemeData(content);
  };

  const handleEdit = () => {
    setEditing(true); // 수정 버튼을 누르면 편집 모드로 전환
  };

  const handleSave = () => {
    console.log("saving data", schemeData);
    setEditing(false);
  };

  const convertToHTML = (text) => {
    return text.replace(/\n/g, "<br />");
  };

  return (
    <div>
      <br />
      <h3>| Scheme</h3>
      <br />
      <div>
        {editing ? (
          <div style={{ width: "1200px" }}>
            <div className="d-flex justify-content-end">
              <Button
                className="mb-4 me-2"
                variant="outline-success"
                onClick={() => setEditing(false)}>
                취소
              </Button>
              <Button
                className="mb-4 "
                variant="outline-success"
                onClick={handleSave}>
                저장
              </Button>
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={data && convertToHTML(data[0].description)}
              onChange={handleEditorChange}
            />
          </div>
        ) : (
          <div style={{ width: "1200px" }}>
            <div className="d-flex justify-content-end">
              <Button
                className="mb-2"
                variant="outline-success"
                onClick={handleEdit}>
                수정
              </Button>
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {data && data[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheme;
