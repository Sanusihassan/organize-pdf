import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { ToolState, setIsSubmitted, setShowOptions } from "../../src/store";
import type { edit_page } from "../../content";
export function SubmitBtn({
  k,
  edit_page,
}: {
  k: string;
  edit_page: edit_page;
}): JSX.Element {
  const dispatch = useDispatch();
  const { submitBtn } = useFileStore();
  // state variables:
  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  const isSubmitted = useSelector(
    (state: { tool: ToolState }) => state.tool.isSubmitted
  );
  const pageOrders = useSelector(
    (state: { tool: ToolState }) => state.tool.pageOrders
  );
  // const pageCount = useSelector(
  //   (state: { tool: ToolState }) => state.tool.pageCount
  // );
  function isArraySorted(arr: number[]): boolean {
    return arr.every((value, index) => index === 0 || value >= arr[index - 1]);
  }
  return (
    <button
      className={`submit-btn btn btn-lg text-white position-relative overflow-hidden ${k} grid-footer`}
      onClick={() => {
        dispatch(setIsSubmitted(true));
        dispatch(setShowOptions(false));
        if (submitBtn) {
          submitBtn?.current?.click();
        }
      }}
      //this "1 - 3" might not satisfy this condition: selectedPages === `1-${pageCount}`
      // what i want is a pattern that matches any number of spaces around and between the "1-3" meaning that i want to match any spaces around, or we could just trim the selectedPages and check right?
      disabled={errorMessage.length > 0 || isArraySorted(pageOrders)}
    >
      <bdi>
        {
          edit_page.action_buttons[
            k.replace(/-/g, "_") as keyof typeof edit_page.action_buttons
          ]
        }
      </bdi>{" "}
      {isSubmitted ? (
        <Spinner as="span" animation="grow" role="status" aria-hidden="true" />
      ) : null}
    </button>
  );
}
