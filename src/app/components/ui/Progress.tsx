import * as React from "react";

interface ProgressProps {
  value: number; // Percentage (0 - 100)
  className?: string; // Optional additional styles
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`relative w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
