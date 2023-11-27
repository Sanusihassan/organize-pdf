import { ActionProps } from "./ActionDiv";
import type { errors as _ } from "../../content";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { DropResult } from "react-beautiful-dnd";
import {
  calculatePages,
  getNthPageAsImage,
  getPlaceHoderImageUrl,
} from "../../src/utils";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setPageCount } from "@/src/store";
import { Pages } from "./Pages";
type OmitFileName<T extends ActionProps> = Omit<T, "fileName" | "index">;

type CardProps = OmitFileName<ActionProps> & {
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  index?: number | string;
};
export type imageUrlsType = {
  url: string;
  id: number;
}[];

const FileCard = ({
  file,
  errors,
  extension,
  loader_text,
}: CardProps) => {
  const [imageUrls, setImageUrls] = useState<imageUrlsType>([]);
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const dispatch = useDispatch();
  let isSubscribed = true;
  const processFile = async () => {
    try {
      if (extension && extension === ".pdf") {
        if (isSubscribed) {
          const urls: imageUrlsType = [];
          for (let i = 1; i <= pageCount; i += 1) {
            let url = await getNthPageAsImage(file, dispatch, errors, i);
            urls.push({ url, id: i });
          }
          setImageUrls(urls);
        }
      } else if (extension && extension !== ".jpg") {
        if (isSubscribed) {
          setImageUrls(
            !file.size
              ? [{ url: "/images/corrupted.png", id: 1 }]
              : [{ url: getPlaceHoderImageUrl(extension), id: 1 }]
          );
        }
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };
  useEffect(() => {
    (async () => {
      let _pageCount = await calculatePages(file);
      dispatch(setPageCount(_pageCount));
    })();
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file, pageCount]);
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    setImageUrls((prevImageUrls) => {
      const items = Array.from(prevImageUrls);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination!.index, 0, reorderedItem);
      return items;
    });
  };

  return (
    <>
      {imageUrls.length == 0 ? (
        <div className="initial-loader">
          <Loader loader_text={loader_text} animate={false} />
        </div>
      ) : null}
      <Pages
        handleOnDragEnd={handleOnDragEnd}
        imageUrls={imageUrls}
        loader_text={loader_text}
      />
    </>
  );
};

export default FileCard;
