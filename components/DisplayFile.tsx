import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { useRouter } from "next/router";
import { validateFiles } from "../src/utils";
import type { errors as _, edit_page } from "../content";
import Files from "./DisplayFile/Files";
import { useSelector, useDispatch } from "react-redux";
import { ToolState, resetErrorMessage, setField } from "../src/store";
import { useFileStore } from "../src/file-store";
type propTypes = {
  extension: string;
  pages: string;
  page: string;
  lang: string;
  errors: _;
  edit_page: edit_page;
};

const DisplayFile = ({
  extension,
  pages,
  page,
  lang,
  errors,
  edit_page,
}: propTypes) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [toolTipSizes, setToolTipSizes] = useState<string[]>([]);
  // actual files
  const { files, setImageUrls } = useFileStore();
  // state variables:
  const dispatch = useDispatch();

  useEffect(() => {
    // const max_files = 2;
    // if (state && files.length > max_files) {
    //   state?.setErrorMessage(errors.MAX_FILES_EXCEEDED.message);
    // }
  }, [extension]);
  // const handleDragEnd = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }
  // };

  return (
    <div className="display-file">
      <Files
        errors={errors}
        extension={extension}
        setToolTipSizes={setToolTipSizes}
        toolTipSizes={toolTipSizes}
        loader_text={edit_page.loader_text}
        showSpinner={showSpinner}
        fileDetailProps={[pages, page, lang]}
      />
    </div>
  );
};

export default DisplayFile;
