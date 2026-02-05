// OrganizePDFFileCard.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  type DraggableProvided,
  type DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Trash2, FileText, GripVertical } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy, PageViewport, RenderTask } from "pdfjs-dist";
import { useFileStore } from "../../src/file-store";
import { setField } from "../../src/store";
import type { errors as _ } from "../../src/content";

// ============ TYPES ============
export interface OrganizePDFFileCardProps {
  file: File;
  errors: _;
  content: {
    page: string;
    pages: string;
    remove_file: string;
    loading: string;
    drag_to_reorder: string;
  };
  themeColor?: string;
}

interface PageImage {
  pageNum: number;
  imageUrl: string;
}

// ============ CONSTANTS ============
const THEME_COLOR_DEFAULT = "#6c5ce7";

// ============ SKELETON LOADER ============
const PageSkeleton = () => {
  return <div className="aspect-[8.5/11] bg-gray-200 rounded animate-pulse" />;
};

// ============ HELPER FUNCTIONS ============
async function renderPDFPage(
  file: File,
  pageNum: number,
  dispatch: ReturnType<typeof useDispatch>,
  errors: _,
  password?: string,
): Promise<string> {
  const fileUrl = URL.createObjectURL(file);

  try {
    const loadingTask = pdfjs.getDocument({
      url: fileUrl,
      password: password || undefined,
    });

    const pdf: PDFDocumentProxy = await loadingTask.promise;
    const page = await pdf.getPage(pageNum);
    const scale = 1.5;
    const viewport: PageViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas context not available.");
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderTask: RenderTask = page.render({
      canvasContext: context,
      viewport: viewport,
    });

    await renderTask.promise;
    const imageUrl = canvas.toDataURL();

    URL.revokeObjectURL(fileUrl);
    return imageUrl;
  } catch (error: any) {
    URL.revokeObjectURL(fileUrl);

    if (error?.name === "PasswordException") {
      dispatch(setField({ errorCode: "PASSWORD_REQUIRED" }));
      return "";
    }

    dispatch(
      setField({
        errorMessage: errors.FILE_CORRUPT?.message || "File is corrupt",
      }),
    );
    return "";
  }
}

async function getPDFPageCount(
  file: File,
  dispatch: ReturnType<typeof useDispatch>,
  errors: _,
  password?: string,
): Promise<number> {
  const fileUrl = URL.createObjectURL(file);

  try {
    const loadingTask = pdfjs.getDocument({
      url: fileUrl,
      password: password || undefined,
    });

    const pdf: PDFDocumentProxy = await loadingTask.promise;
    const pageCount = pdf.numPages;

    URL.revokeObjectURL(fileUrl);
    return pageCount;
  } catch (error: any) {
    URL.revokeObjectURL(fileUrl);

    if (error?.name === "PasswordException") {
      dispatch(setField({ errorCode: "PASSWORD_REQUIRED" }));
      return 0;
    }

    dispatch(
      setField({
        errorMessage: errors.FILE_CORRUPT?.message || "File is corrupt",
      }),
    );
    return 0;
  }
}

// ============ PAGE COMPONENT ============
interface PageItemProps {
  pageImage: PageImage;
  index: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  themeColor: string;
}

const PageItem = ({
  pageImage,
  index,
  provided,
  snapshot,
  themeColor,
}: PageItemProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`relative aspect-[8.5/11] rounded-lg overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing ${
        snapshot.isDragging ? "shadow-2xl scale-105 z-50" : "shadow-sm"
      }`}
      style={{
        borderColor: snapshot.isDragging ? themeColor : "#e5e7eb",
        ...provided.draggableProps.style,
      }}
    >
      {/* Page Image */}
      <img
        src={pageImage.imageUrl}
        alt={`Page ${pageImage.pageNum}`}
        className="w-full h-full object-contain bg-white pointer-events-none"
        draggable={false}
      />

      {/* Page Number Badge */}
      <div
        className="absolute top-2 left-2 px-2 py-1 text-white text-xs font-medium rounded pointer-events-none"
        style={{ backgroundColor: themeColor }}
      >
        {index + 1}
      </div>

      {/* Drag Handle Icon (Visual indicator only) */}
      <div className="absolute bottom-2 right-2 p-1.5 bg-black/60 rounded pointer-events-none">
        <GripVertical size={16} className="text-white" />
      </div>
    </div>
  );
};

// ============ MAIN COMPONENT ============
export const OrganizePDFFileCard = ({
  file,
  errors,
  content,
  themeColor = THEME_COLOR_DEFAULT,
}: OrganizePDFFileCardProps) => {
  const dispatch = useDispatch();
  const { files, setFiles } = useFileStore();
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [pageImages, setPageImages] = useState<PageImage[]>([]);
  const [pageOrders, setPageOrders] = useState<number[]>([]);
  const isSubscribedRef = useRef(true);

  // Load PDF page count and render pages
  useEffect(() => {
    isSubscribedRef.current = true;

    const loadPDF = async () => {
      setIsLoading(true);

      // Get page count
      const count = await getPDFPageCount(file, dispatch, errors);

      if (isSubscribedRef.current && count > 0) {
        setPageCount(count);
        dispatch(setField({ pageCount: count, selectedFile: file.name }));

        // Initialize page orders [1, 2, 3, ...] - this is the original/sorted order
        const initialOrders = Array.from({ length: count }, (_, i) => i + 1);
        setPageOrders(initialOrders);

        // ✅ Initialize Redux with empty array (indicating no reordering yet)
        dispatch(setField({ pageOrders: [] }));

        // Render pages
        const images: PageImage[] = [];
        for (let i = 1; i <= count; i++) {
          const imageUrl = await renderPDFPage(file, i, dispatch, errors);
          if (isSubscribedRef.current && imageUrl) {
            images.push({ pageNum: i, imageUrl });
            setPageImages([...images]); // Update progressively
          }
        }

        setIsLoading(false);
      }
    };

    loadPDF();

    return () => {
      isSubscribedRef.current = false;
    };
  }, [file, dispatch, errors]);

  // Handle drag end - reorder pages
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      if (sourceIndex === destIndex) return;

      // Reorder page images
      const newPageImages = Array.from(pageImages);
      const [removed] = newPageImages.splice(sourceIndex, 1);
      newPageImages.splice(destIndex, 0, removed);
      setPageImages(newPageImages);

      // Update page orders for backend
      const newPageOrders = newPageImages.map((img) => img.pageNum);
      setPageOrders(newPageOrders);

      // Store in Redux for submission
      dispatch(setField({ pageOrders: newPageOrders }));

      console.log("New page order:", newPageOrders);
    },
    [pageImages, dispatch],
  );

  // Remove file
  const handleRemoveFile = () => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
    dispatch(
      setField({
        pageCount: 0,
        selectedFile: "",
        pageOrders: [],
      }),
    );
  };

  // Loading state
  if (isLoading || pageImages.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <FileText size={24} style={{ color: themeColor }} />
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {file.name}
            </h3>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-400 animate-pulse">
              {content.loading}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: Math.min(pageCount || 8, 8) }).map((_, i) => (
            <PageSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <FileText size={24} style={{ color: themeColor }} />
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {file.name.length > 40
                ? file.name.slice(0, 20) + "..." + file.name.slice(-17)
                : file.name}
            </h3>
            <span
              className="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap"
              style={{
                backgroundColor: `${themeColor}15`,
                color: themeColor,
              }}
            >
              {pageCount} {pageCount === 1 ? content.page : content.pages}
            </span>
          </div>

          {/* Remove File Button */}
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title={content.remove_file}
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Info Text */}
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <GripVertical size={16} />
          {content.drag_to_reorder}
        </div>

        {/* Pages Grid with Drag & Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pdf-pages" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {pageImages.map((pageImage, index) => (
                  <Draggable
                    key={`page-${pageImage.pageNum}`}
                    draggableId={`page-${pageImage.pageNum}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <PageItem
                        pageImage={pageImage}
                        index={index}
                        provided={provided}
                        snapshot={snapshot}
                        themeColor={themeColor}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default OrganizePDFFileCard;
