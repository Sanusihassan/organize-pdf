/**
 * // i decided to change the implementaion of the imageUrls:
  const [imageUrls, setImageUrls] = useState<imageUrlsType>(
    {} as imageUrlsType
  ); please show me how to update each setImageUrls that satisfies the new type
 */
import { ActionProps } from "./ActionDiv";
import type { errors as _ } from "../../content";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  calculatePages,
  getNthPageAsImage,
  getPlaceHoderImageUrl,
} from "../../src/utils";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "./ImageWithLoader";
import { ToolState, setPageCount, setPageOrders } from "@/src/store";
type OmitFileName<T extends ActionProps> = Omit<T, "fileName" | "index">;

type CardProps = OmitFileName<ActionProps> & {
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  index?: number | string;
};
type imageUrlsType = {
  url: string;
  id: number;
}[];

const FileCard = ({
  file,
  errors,
  extension,
  loader_text,
  fileDetailProps,
}: CardProps) => {
  const [imageUrls, setImageUrls] = useState<imageUrlsType>([]);
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const pageOrders = useSelector(
    (state: { tool: ToolState }) => state.tool.pageOrders
  );
  const dispatch = useDispatch();
  let isSubscribed = true;
  useEffect(() => {
    (async () => {
      let _pageCount = await calculatePages(file);
      dispatch(setPageCount(_pageCount));
      if (pageOrders.length === 0) {
        dispatch(setPageOrders(Array.from({ length: pageCount }, (_, i) => i)));
      }
    })();
    console.log(pageOrders);
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
    processFile();
    // const pageOrders = Array.from([]);
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
    dispatch(
      setPageOrders(
        [...pageOrders].sort((a, b) => {
          const indexA = imageUrls.findIndex((item) => item.id === a);
          const indexB = imageUrls.findIndex((item) => item.id === b);
          return indexA - indexB;
        })
      )
    );
  };

  return (
    <>
      {imageUrls.length == 0 ? (
        <div className="initial-loader">
          <Loader loader_text={loader_text} animate={false} />
        </div>
      ) : null}
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="pages">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="pages"
                style={{
                  overflowX: "hidden",
                }}
              >
                {imageUrls.map((imageUrl, index) => (
                  <div key={index.toString()} className="page">
                    <Draggable
                      key={index.toString()}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ImageWithLoader
                            imageUrl={imageUrl.url}
                            loader_text={loader_text}
                          />
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* ))} */}
    </>
  );
};

export default FileCard;
