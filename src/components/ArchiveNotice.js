import React from "react";

const ArchiveNotice = ({ year }) => {
  return (
    <div className="archive-notice my-6 p-4 rounded-md border-l-4 border-gray-400 bg-gray-800 text-gray-200">
      <strong>Archived Post:</strong> Published in {year}. This content is
      preserved for historical context and may reference older code patterns or
      tools.
    </div>
  );
};

export default ArchiveNotice;
