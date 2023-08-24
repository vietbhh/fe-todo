import React from "react";
import Done from "./Done";
import Remove from "./Remove";

function TodoRowWork({ data, handleChangeStatus, handleDelete }) {
  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{data.content}</p>
      <Done handleChangeStatus={handleChangeStatus} data={data} />
      <Remove handleDelete={handleDelete} data={data} />
    </div>
  );
}

export default React.memo(TodoRowWork);
