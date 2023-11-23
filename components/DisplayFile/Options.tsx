import { Row } from "react-bootstrap";
import type { edit_page as _ } from "../../content";
export interface OptionsProps {
  layout?: string;
  edit_page: _;
}

import React, { useEffect, useRef, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { ToolState, setSelectedPages } from "@/src/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const RemovePagesOptions = ({
  options,
}: {
  options: _["remove_pages_options"];
}) => {
  const selectedPages = useSelector(
    (state: { tool: ToolState }) => state.tool.selectedPages
  );
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  useEffect(() => {
    if (selectedPages !== "") {
      setInputVal(selectedPages);
    } else {
      setInputVal("");
    }
  }, [selectedPages, pageCount]);
  const timeoutRef = useRef<NodeJS.Timeout>({} as NodeJS.Timeout);
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="container w-100">
      <div className="row m0">
        <div className="alert alert-info" role="alert">
          <InformationCircleIcon className="icon" />
          &nbsp;{options.info}
        </div>
      </div>
      <Row className="m0 align-items-center">
        <div className="col row">
          <p>{options.total_pages}</p>&nbsp;<strong>{pageCount}</strong>
        </div>
      </Row>
      <Row className="m0 align-items-center">
        <div>
          <h6>{options.pages_to_remove}</h6>
        </div>
      </Row>
      <Row className="m0">
        <div className="col p-0">
          <input
            type="text"
            className="form-control"
            placeholder={options.placeholder}
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                const pattern = /^(\d+(?:-\d+)?,)*(\d+(?:-\d+)?)$/;
                if (pattern.test(e.target.value.replace(/\s/g, ""))) {
                  setInputVal(e.target.value);
                  dispatch(setSelectedPages(e.target.value));
                } else {
                  setInputVal("");
                  dispatch(setSelectedPages(""));
                }
              }, 2000);
            }}
          />
        </div>
      </Row>
    </div>
  );
};

const Options = ({ edit_page }: OptionsProps) => {
  return (
    <>
      <RemovePagesOptions options={edit_page["remove_pages_options"]} />
    </>
  );
};

export default Options;
