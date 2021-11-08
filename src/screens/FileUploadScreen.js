import React, { useState, useEffect } from "react";
import { singleFileUpload, multipleFilesUpload } from "../data/api";

import "react-circular-progressbar/dist/styles.css";

const FileUploadScreen = (props) => {
  const [singleFile, setSingleFile] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [characterList, setCharacterList] = useState("");

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);
    formData.append("title", title);
    formData.append("characterList", characterList);
    await singleFileUpload(formData);
    props.getsingle();
  };
  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("title", title);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData);
    props.getMultiple();
  };
  return (
    <div className="row mt-3">
      <div className="col-6">
        <div className="form-group">
          <label>Select Single File and data</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCharacterList(e.target.value)}
            placeholder="Enter Character List etc"
          />
          <input
            type="file"
            className="form-control"
            onChange={(e) => SingleFileChange(e)}
          />
        </div>
        <div className="row">
          <div className="col-10">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => uploadSingleFile()}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Select Multiple Files</label>
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="btn btn-danger"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadScreen;
