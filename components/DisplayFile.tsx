import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import type { errors as _, edit_page } from "../src/content";
import Files from "./DisplayFile/Files";
import type { Paths } from "../src/content/content";
type propTypes = {
  extension: string;
  errors: _;
  edit_page: edit_page;
  drop_files: string;
  path: Paths;
};

const DisplayFile = ({
  extension,
  errors,
  edit_page,
  drop_files,
  path,
}: propTypes) => {
  const [toolTipSizes, setToolTipSizes] = useState<string[]>([]);

  useEffect(() => {}, [extension]);

  return (
    <>
      <Files
        errors={errors}
        setToolTipSizes={setToolTipSizes}
        toolTipSizes={toolTipSizes}
        drop_files={drop_files}
        path={path}
        fileCard={edit_page.fileCard}
      />
    </>
  );
};

export default DisplayFile;
