import { Row } from "react-bootstrap";
import type { edit_page as _ } from "../../content";
export interface OptionsProps {
  layout?: string;
  edit_page: _;
}

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

const RemovePagesOptions = ({
  options,
}: {
  options: _["remove_pages_options"];
}) => {
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
          <p>{options.total_pages}</p>&nbsp;<strong>0</strong>
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
