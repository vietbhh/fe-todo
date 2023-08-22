import React from "react";

function TodoRowDone({ data, handleChangeStatus, handleDelete }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full line-through text-green">{data.content}</p>
      <button
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-200 border-gray-200 hover:bg-gray-500"
        onClick={() => handleChangeStatus.mutate(data.id)}
      >
        Not Done
      </button>
      <button
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500"
        onClick={() => handleDelete.mutate(data.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default React.memo(TodoRowDone);
