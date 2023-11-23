import { Dispatch, SetStateAction, useEffect } from "react";
import type { errors as _ } from "../../content";
import FileCard from "./FileCard";
import { isDraggableExtension } from "../../src/utils";
import { useRouter } from "next/router";
import { useFileStore } from "../../src/file-store";

type FileProps = {
  errors: _;
  extension: string;
  toolTipSizes: string[];
  setToolTipSizes: Dispatch<SetStateAction<string[]>>;
  loader_text: string;
  showSpinner: boolean;
  fileDetailProps: [string, string, string];
};
const Files = ({
  errors,
  extension,
  toolTipSizes,
  loader_text,
  showSpinner,
  fileDetailProps,
}: FileProps) => {
  // const store = useSelector((state: { tool: ToolState }) => state.tool);
  const { files, imageUrls, setImageUrls } = useFileStore();

  useEffect(() => {}, [files]);

  const router = useRouter();
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    // Argument of type 'Blob[]' is not assignable to parameter of type 'File[]'.
    // Type 'Blob' is missing the following properties from type 'File': lastModified, webkitRelativePathts(2345)
    if (isDraggableExtension(extension, router)) {
      // dispatch(setFiles(store.files));
    }
  };

  return (
    <>
      {files.length > 0 ? (
        <FileCard
          file={files[0]}
          errors={errors}
          loader_text={loader_text}
          fileDetailProps={fileDetailProps}
          extension={extension}
        />
      ) : null}
    </>
  );
};

export default Files;
