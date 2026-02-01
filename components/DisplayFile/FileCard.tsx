import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { ActionDiv, type ActionProps } from "./ActionDiv";
import { Tooltip } from "react-tooltip";
import type { errors as _, edit_page } from "../../src/content";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Loader } from "./Loader";
import {
  getFileDetailsTooltipContent,
  getFirstPageAsImage,
  getPlaceHoderImageUrl,
  sanitizeKey,
  shortenFileName,
} from "../../src/utils";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../../src/store";

type OmitFileName<T extends ActionProps> = Omit<T, "fileName">;

type CardProps = OmitFileName<ActionProps> & {
  index: number;
  file: File;
  isDraggable: boolean;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  languageSelectProps: {
    content: edit_page["filenameOptions"];
    themeColor: string;
  };
  actionContent: edit_page["actionContent"];
};

const FileCard = ({
  index,
  file,
  isDraggable,
  provided,
  errors,
  extension,
  loader_text,
  fileDetailProps,
  languageSelectProps,
  actionContent,
}: CardProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [tooltipSize, setToolTipSize] = useState("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const isSubscribedRef = useRef(true);
  const hasProcessedRef = useRef(false);

  const sanitizedKey = useMemo(
    () => (file.name ? sanitizeKey(file.name.split(".")[0]) : null),
    [file.name],
  );

  const rotation = useSelector((state: { tool: ToolState }) => {
    if (!sanitizedKey) return null;
    return state.tool.rotations?.find((r) => r.k === sanitizedKey) || null;
  });

  // Get current passwords from Redux store
  const allPasswords = useSelector(
    (state: { tool: ToolState }) => state.tool.passwords || [],
  );

  const [needsPassword, setNeedsPassword] = useState(false);

  const processFile = useCallback(
    async (currentPassword: string) => {
      // PREVENT DUPLICATE PROCESSING
      if (hasProcessedRef.current && !currentPassword) {
        return;
      }
      hasProcessedRef.current = true;

      try {
        setShowLoader(true);
        if (extension && extension === ".pdf") {
          if (isSubscribedRef.current) {
            const img = await getFirstPageAsImage(
              file,
              dispatch,
              errors,
              currentPassword || undefined,
            );

            const _needsPassword = img === "/images/locked.png";
            setNeedsPassword(_needsPassword);

            if (isSubscribedRef.current) {
              setImageUrl(img);

              // Only dispatch password updates if successfully unlocked
              if (img && img !== "/images/locked.png" && currentPassword) {
                // Filter out old password for this file
                const filteredPasswords = allPasswords.filter(
                  (p) => p.k !== sanitizedKey,
                );

                // Add new password for this file
                const updatedPasswords = [
                  ...filteredPasswords,
                  { k: sanitizedKey, p: currentPassword },
                ];

                dispatch(
                  setField({
                    passwords: updatedPasswords,
                    errorCode: "",
                    errorMessage: "",
                  }),
                );
              } else if (img && img !== "/images/locked.png") {
                dispatch(setField({ errorCode: "", errorMessage: "" }));
              }
            }
          }
        } else {
          if (isSubscribedRef.current) {
            setImageUrl(
              !file.size
                ? "/images/corrupted.png"
                : getPlaceHoderImageUrl(extension),
            );
          }
        }
      } finally {
        if (isSubscribedRef.current) {
          setShowLoader(false);
        }
      }
    },
    [extension, file, dispatch, errors, sanitizedKey],
  );

  // Initial mount effect - run once
  useEffect(() => {
    isSubscribedRef.current = true;

    (async () => {
      let size = await getFileDetailsTooltipContent(
        file,
        ...fileDetailProps,
        dispatch,
        errors,
      );
      if (isSubscribedRef.current) {
        setToolTipSize(size);
      }
    })();

    return () => {
      isSubscribedRef.current = false;
    };
  }, [file, fileDetailProps, dispatch, errors]);

  // Process file effect - runs on mount and password changes
  useEffect(() => {
    if (password) {
      hasProcessedRef.current = false; // Allow reprocessing with new password
      processFile(password);
    } else if (!hasProcessedRef.current) {
      processFile("");
    }
  }, [password, processFile]);

  return (
    <div
      className="card item"
      data-tooltip-id={`item-tooltip-${index}`}
      data-tooltip-html={tooltipSize}
      data-tooltip-place="top"
      {...(isDraggable ? provided.dragHandleProps : {})}
    >
      {showLoader ? <Loader loader_text={loader_text} /> : null}
      <bdi>
        <Tooltip id={`item-tooltip-${index}`} />
      </bdi>
      <ActionDiv
        extension={extension}
        fileName={file.name}
        setPassword={setPassword}
        needsPassword={needsPassword}
        noRotation={languageSelectProps.themeColor.includes("pdf-to-text")}
        content={actionContent}
      />
      <div className="card-body">
        {!showLoader ? (
          <img
            className="img-fluid-custom"
            src={imageUrl}
            alt={`Selected file ${index}`}
            draggable={false}
            style={
              rotation
                ? { transform: `rotate(${rotation.r}deg)`, scale: 0.8 }
                : undefined
            }
          />
        ) : null}

        <p className="text-center">{shortenFileName(file.name)}</p>
      </div>
    </div>
  );
};

export default FileCard;
