import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import ImageWithLoader from "./ImageWithLoader";
import { imageUrlsType } from "./FileCard";
import { useEffect } from "react";
import { setPageOrders } from "@/src/store";
import { useDispatch } from "react-redux";

type props = {
  handleOnDragEnd: (result: DropResult) => void;
  imageUrls: imageUrlsType;
  loader_text: string;
};
export const Pages = ({ handleOnDragEnd, imageUrls, loader_text }: props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageOrders(imageUrls.map((item) => item.id)));
    console.log(imageUrls);
  }, [imageUrls]);
  return (
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
  );
};
