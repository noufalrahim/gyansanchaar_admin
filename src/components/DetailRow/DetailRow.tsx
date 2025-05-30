import React from "react";

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, className = "" }) => {
  return (
    <div className={`py-3 ${className}`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </dd>
    </div>
  );
};

export default DetailRow;