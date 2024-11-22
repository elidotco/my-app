import React, { useRef, useEffect, ReactNode, RefObject } from "react";

interface ClickOutsideProps {
  children: ReactNode;
  handler: () => void; // Callback when clicking outside
  exceptionRef?: RefObject<HTMLElement>; // Optional element that won't trigger the handler
  className?: string; // Optional class for styling
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
      const clickedInside = Boolean(
        (wrapperRef.current &&
          wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef &&
            ((exceptionRef.current && exceptionRef.current === event.target) ||
              (exceptionRef.current &&
                exceptionRef.current.contains(event.target as Node))))
      );

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
