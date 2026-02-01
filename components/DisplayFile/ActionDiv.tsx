import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { Eye, EyeOff, LockKeyholeOpen, RotateCw } from "lucide-react";
import type { errors as _ } from "../../src/content";

import { useDispatch, useSelector } from "react-redux";
import { useFileStore } from "../../src/file-store";
import { sanitizeKey } from "../../src/utils";
import { setField, type ToolState } from "../../src/store";
import type { SetStateAction, Dispatch } from "react";
import { useState, useEffect, useRef } from "react";

export type ActionProps = {
  extension: string;
  fileName: string;
  setPassword?: Dispatch<SetStateAction<string>>;
  needsPassword?: boolean;
  noRotation?: boolean;
  content?: {
    current: string;
    info: string;
  };
};

export const ActionDiv = ({
  extension,
  fileName,
  setPassword,
  needsPassword,
  noRotation,
  content,
}: ActionProps) => {
  const { files, setFiles } = useFileStore();
  const dispatch = useDispatch();
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customRotation, setCustomRotation] = useState("");
  const [showRotationInput, setShowRotationInput] = useState(false);
  const rotationFormRef = useRef<HTMLDivElement>(null);

  const rotations = useSelector(
    (state: { tool: ToolState }) => state.tool.rotations,
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };

  const getCurrentRotation = () => {
    const k = sanitizeKey(fileName.split(".")[0]);
    const existingRotation =
      rotations && k ? rotations.find((r) => r.k === k) : null;
    return existingRotation ? existingRotation.r : 0;
  };

  const setRotation = (rotation: number) => {
    const k = sanitizeKey(fileName.split(".")[0]);
    const newRotations = [
      ...rotations.filter((r) => r.k !== k),
      { k, r: rotation },
    ];

    dispatch(
      setField({
        rotations: newRotations,
      }),
    );
  };

  const handleQuickRotate = () => {
    const currentRotation = getCurrentRotation();
    const newRotation = currentRotation + 90;
    setRotation(newRotation);
  };

  const closeRotationInput = () => {
    setShowRotationInput(false);
    setCustomRotation("");
  };

  const handleCustomRotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rotationValue = parseFloat(customRotation);

    if (!isNaN(rotationValue)) {
      const currentRotation = getCurrentRotation();
      const newRotation = currentRotation + rotationValue;
      setRotation(newRotation);
      closeRotationInput();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setPassword && passwordInput.trim()) {
      setPassword(passwordInput);
    }
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const toggleRotationInput = () => {
    setShowRotationInput((prev) => !prev);
    if (showRotationInput) {
      setCustomRotation("");
    }
  };

  // Handle click outside to close rotation input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rotationFormRef.current &&
        !rotationFormRef.current.contains(event.target as Node)
      ) {
        closeRotationInput();
      }
    };

    if (showRotationInput) {
      // Add a small delay to prevent immediate closing when opening
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRotationInput]);

  // Handle Escape key to close rotation input
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showRotationInput) {
        closeRotationInput();
      }
    };

    if (showRotationInput) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showRotationInput]);

  const currentRotation = getCurrentRotation();

  return (
    <>
      <div
        className={`action-div flex ${
          extension === ".html" ? "justify-end" : "justify-between"
        } relative z-10`}
      >
        <button className="btn btn-light" onClick={(e) => handleClick(e)}>
          <TrashIcon className="icon hero-icon" />
        </button>
        {noRotation ? null : (
          <div className="flex gap-1 items-center">
            {currentRotation !== 0 && (
              <span className="text-gray-500 text-xs font-medium px-1">
                {currentRotation}°
              </span>
            )}
            <button className="btn btn-light" onClick={handleQuickRotate}>
              <RefreshIcon className="hero-icon" />
            </button>
            <button
              className={`btn ${showRotationInput ? "btn-primary" : "btn-light"}`}
              onClick={toggleRotationInput}
              title="Custom rotation"
            >
              <RotateCw size={16} />
            </button>
          </div>
        )}
      </div>

      {showRotationInput && !noRotation && (
        <div ref={rotationFormRef} className="relative z-50">
          <form onSubmit={handleCustomRotationSubmit}>
            <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10ac84] focus:border-transparent text-sm"
                  placeholder="Enter degrees (e.g., 45, -30, 135)"
                  value={customRotation}
                  onChange={(e) => setCustomRotation(e.target.value)}
                  step="0.1"
                  autoFocus
                />
                <button
                  type="submit"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-2 bg-[#10ac84] text-white rounded-md hover:bg-[#0e9872] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  disabled={
                    !customRotation.trim() || isNaN(parseFloat(customRotation))
                  }
                  title="Apply rotation"
                >
                  <RotateCw size={16} />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                {content?.current}:{" "}
                <span className="font-semibold">{currentRotation}°</span> |
                <span className="ml-1">{content?.info}</span>
              </div>
            </div>
          </form>
        </div>
      )}

      {needsPassword && (
        <form onSubmit={handlePasswordSubmit} className="relative z-50">
          <div className="password-input-row">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="show-password"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!passwordInput.trim()}
              >
                <LockKeyholeOpen size={16} />
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
