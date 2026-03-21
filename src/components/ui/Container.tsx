import type { ReactNode } from "react";
type ContainerProps = {
  children: ReactNode;
  className?: string;
};
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={className}
      style={{ margin: "0 auto", maxWidth: "80rem", width: "100%", paddingLeft: "1.5rem", paddingRight: "1.5rem", boxSizing: "border-box" }}
    >
      {children}
    </div>
  );
}
