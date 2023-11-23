import { ToolState, setSelectedPages } from "@/src/store";
import { XIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const IndividualSelectionComponent = React.memo(
  ({ index }: { index: number }) => {
    const selectedPages = useSelector(
      (state: { tool: ToolState }) => state.tool.selectedPages
    );
    const [showMark, setShowMark] = useState(
      selectedPages.includes(`${index + 1}`)
    );
    useEffect(() => {
      const pages = selectedPages.split(",");
      let isSelected = false;
      for (const page of pages) {
        if (page.includes("-")) {
          const [start, end] = page.split("-").map(Number);
          if (index + 1 >= start && index + 1 <= end) {
            isSelected = true;
            break;
          }
        } else if (index + 1 === Number(page)) {
          isSelected = true;
          break;
        }
      }
      setShowMark(isSelected);
    }, [selectedPages]);

    const dispatch = useDispatch();

    const handleClick = () => {
      const pageIndex = index + 1;
      let pagesArray = selectedPages.split(",").flatMap((page: string) => {
        if (page.includes("-")) {
          const [start, end] = page.split("-").map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else {
          return [Number(page)];
        }
      });

      if (pageIndex === 1 && pagesArray.length === 0) {
        let newSelectedPages = "1";
        dispatch(setSelectedPages(newSelectedPages));
        setShowMark(!showMark);
        return;
      }

      if (pagesArray.includes(pageIndex)) {
        pagesArray = pagesArray.filter((page) => page !== pageIndex);
      } else {
        pagesArray.push(pageIndex);
      }
      pagesArray.sort((a, b) => a - b);

      let newSelectedPages = "";
      let start = pagesArray[0];
      for (let i = 1; i < pagesArray.length; i++) {
        if (pagesArray[i] !== pagesArray[i - 1] + 1) {
          newSelectedPages +=
            start === pagesArray[i - 1]
              ? `${start},`
              : `${start}-${pagesArray[i - 1]},`;
          start = pagesArray[i];
        }
      }
      newSelectedPages +=
        start === pagesArray[pagesArray.length - 1]
          ? `${start}`
          : `${start}-${pagesArray[pagesArray.length - 1]}`;

      dispatch(setSelectedPages(newSelectedPages));
      setShowMark(!showMark);
    };
    return (
      <div onClick={handleClick} className="extract-file-card">
        <XIcon className={`icon${showMark ? "" : " d-none"}`} />
      </div>
    );
  }
);

export const ExtractFileCard = React.memo(({ index }: { index: number }) => {
  return <IndividualSelectionComponent index={index} />;
});
