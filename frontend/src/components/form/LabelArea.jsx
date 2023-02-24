import React from "react";

const LabelArea = ({ label }) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
  );
};

export default LabelArea;
