import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { createTodo } from "../../apis/todoApi";

function TodoAdd() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const createMutation = useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: (data, variables, context) => {
      queryClient.prefetchQuery({ queryKey: ["todos"] });
    }
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mt-4">
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker focus:outline-none ${
            errors.content ? "border-red-500" : ""
          }`}
          {...register("content", { required: true, minLength: 5 })}
          placeholder="Add Todo"
        />
        {errors.content && errors.content.type === "required" && (
          <span className="text-red-500">This is required</span>
        )}
        {errors.content && errors.content.type === "minLength" && (
          <span className="text-red-500">This is invalid</span>
        )}
        <button
          type="submit"
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-300 hover:text-white hover:bg-teal-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default React.memo(TodoAdd);
