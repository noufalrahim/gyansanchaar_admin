import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-light-100 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-100">
        <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default InfoCard;