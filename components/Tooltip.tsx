import React, { useState } from "react";
import styles from "../styles/tooltip.module.scss";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsHovered(!isHovered);

  return (
    <div className={styles.tooltipContainer}>
      <div
        className={styles.tooltipTrigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>
      {isHovered && (
        <div className={`${styles.tooltip} ${styles[position]}`}>{content}</div>
      )}
    </div>
  );
};

export default Tooltip;
