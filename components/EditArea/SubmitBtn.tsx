// SubmitBtn.tsx
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { type ToolState, setField } from "../../src/store";
import type { edit_page, errors } from "../../src/content";
import { canUseSiteToday } from "fetch-subscription-status";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";

// ✅ Helper function to check if array is sequentially sorted [1, 2, 3, 4, ...]
const isSequentiallySorted = (arr: number[]): boolean => {
  if (arr.length === 0) return true;
  return arr.every((num, index) => num === index + 1);
};

export function SubmitBtn({
  k,
  edit_page,
  errors,
}: {
  k: string;
  edit_page: edit_page;
  errors: errors;
}) {
  const dispatch = useDispatch();
  const { submitBtn } = useFileStore();

  // state variables:
  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage,
  );
  const isSubmitted = useSelector(
    (state: { tool: ToolState }) => state.tool.isSubmitted,
  );
  const limitationMsg = useSelector(
    (state: { tool: ToolState }) => state.tool.limitationMsg,
  );
  const subscriptionStatus = useSelector(
    (state: { tool: ToolState }) => state.tool.subscriptionStatus,
  );

  // ✅ Get page orders for organize-pdf tool
  const pageOrders = useSelector(
    (state: { tool: ToolState }) => state.tool.pageOrders,
  );

  const isAdBlockedState = useSelector(
    (state: { tool: ToolState }) => state.tool.isAdBlocked,
  );
  const isAdBlocked =
    process.env.NODE_ENV === "development" ? false : isAdBlockedState;

  // ✅ Check if pages have been reordered (only for organize-pdf)
  const isPagesReordered = useMemo(() => {
    // Only check for organize-pdf tool
    if (k !== "organize-pdf") return true; // Not applicable to other tools

    // Empty array means no order provided yet
    if (pageOrders.length === 0) return false;

    // Sequential order [1, 2, 3, ...] means original order (not reordered)
    return !isSequentiallySorted(pageOrders);
  }, [k, pageOrders]);

  useEffect(() => {
    console.log("errorMessage", errorMessage);
  }, [errorMessage]);

  // ✅ Determine if button should be disabled
  const isDisabled = useMemo(() => {
    const baseDisabled =
      errorMessage.length > 0 || limitationMsg.length > 0 || isAdBlocked;

    // For organize-pdf, also check if pages are reordered
    if (k === "organize-pdf") {
      return baseDisabled || !isPagesReordered;
    }

    return baseDisabled;
  }, [k, errorMessage, limitationMsg, isAdBlocked, isPagesReordered]);

  return (
    <button
      className={`submit-btn ${k}`}
      onClick={() => {
        dispatch(setField({ isSubmitted: true }));
        dispatch(setField({ showOptions: false }));

        if (subscriptionStatus) {
          submitBtn?.current?.click();
        } else if (!subscriptionStatus && canUseSiteToday(10)) {
          submitBtn?.current?.click();
        } else {
          dispatch(
            setField({
              errorCode: "MAX_DAILY_USAGE",
            }),
          );
          dispatch(setField({ errorMessage: errors.MAX_DAILY_USAGE.message }));
          toast(errors.MAX_DAILY_USAGE.message);
          dispatch(
            setField({
              isSubmitted: false,
            }),
          );
        }
      }}
      disabled={isDisabled}
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
