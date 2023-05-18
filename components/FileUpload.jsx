import { useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import StageContext from "/contexts/stage";

export default function FileUpload({ file, image, updateFile, updateImage }) {
  const [, setStage] = useContext(StageContext);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      updateFile(file);

      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const url = reader.result;
        updateImage(url);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "text/html": [".html", ".htm"],
      "video/mp4": [".mp4"],
    },
  });

  const forward = () => {
    setStage(2);
  };

  return (
    <section className="container">
      {file ? (
        <div className="text-center">
          {image && (
            <aside>
              <img
                src={image}
                className="max-h-96 mx-auto object-center object-cover"
              />
            </aside>
          )}
          <button
            className="bg-black text-white px-4 py-2 rounded-3xl mt-6"
            onClick={forward}
          >
            Continue
          </button>
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Upload a png, jpg, or mp4</p>
        </div>
      )}
    </section>
  );
}
