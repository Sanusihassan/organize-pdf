import { RotateCw } from "lucide-react";
import type { edit_page } from "../../src/content";
import { RefreshIcon } from "@heroicons/react/solid";
const Options = ({
  rotate_pdf_options,
}: {
  rotate_pdf_options: edit_page["rotate_pdf_options"];
}) => {
  return (
    <div className="info mx-2">
      {rotate_pdf_options.info1} <RefreshIcon className="icon" />
      {" | "} <RotateCw className="icon" /> {rotate_pdf_options.info2}
    </div>
  );
};

export default Options;
