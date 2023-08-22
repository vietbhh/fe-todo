import React from "react";

function TodoRowWork({ data, handleChangeStatus, handleDelete }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{data.content}</p>
      <button
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-300 hover:bg-green-500"
        onClick={() => handleChangeStatus.mutate(data.id)}
      >
        Done
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

export default React.memo(TodoRowWork);
