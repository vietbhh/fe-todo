import React from "react";
import Recovery from "./Recovery";
import Remove from "./Remove";

function TodoRowDone({ data, handleChangeStatus, handleDelete }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full line-through text-green">{data.content}</p>
      <Recovery handleChangeStatus={handleChangeStatus} data={data} />
      <Remove handleDelete={handleDelete} data={data} />
    </div>
  );
}

export default React.memo(TodoRowDone);
