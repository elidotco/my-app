import React, { useRef, useEffect, ReactNode, RefObject } from "react";

interface ClickOutsideProps {
  children: ReactNode;
  exceptionRef?: RefObject<HTMLElement>;
  onClick: () => void;
  className?: string;
}

interface ClickOutsideProps {
  children: React.ReactNode;
  handler: () => void;
  exceptionRef?: React.RefObject<HTMLElement>;
  className?: string;
}

const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  exceptionRef,
  handler,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      let clickedInside = false;
      if (exceptionRef) {
        clickedInside = Boolean(
          (wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)) ||
            (exceptionRef.current && exceptionRef.current === event.target) ||
            (exceptionRef.current &&
              exceptionRef.current.contains(event.target as Node))
        );
      } else {
        clickedInside = Boolean(
          wrapperRef.current &&
            wrapperRef.current.contains(event.target as Node)
        );
      }

      if (!clickedInside) handler();
    };

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, handler]);

  return (
    <div ref={wrapperRef} className={className || ""}>
      {children}
    </div>
  );
};

export default ClickOutside;
