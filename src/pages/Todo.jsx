import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoAdd, TodoRowDone, TodoRowWork } from "../components/Todo";
import { deleteTodo, getTodos, updateStatusTodo } from "../apis/todoApi";
import { SkeletonDefault } from "../components/Skeleton";

export default function Todo() {
  const queryClient = useQueryClient();
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
    keepPreviousData: true
  });

  const data = todoQuery?.data?.data;

  const handleChangeStatus = useMutation({
    mutationFn: (id) => updateStatusTodo(id),
    onSuccess: (data, variables, context) => {
      queryClient.prefetchQuery({ queryKey: ["todos"] });
    }
  });

  const handleDelete = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: (data, variables, context) => {
      queryClient.prefetchQuery({ queryKey: ["todos"] });
    }
  });

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      {todoQuery.isLoading && <SkeletonDefault />}
      {!todoQuery.isLoading && (
        <>
          <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
              <h1 className="text-grey-darkest">Todo List</h1>
              <TodoAdd />
            </div>
            <div>
              {data?.map((item) => {
                if (Number(item.status) === 1) {
                  return (
                    <TodoRowWork
                      key={item.id}
                      data={item}
                      handleChangeStatus={handleChangeStatus}
                      handleDelete={handleDelete}
                    />
                  );
                }
                return (
                  <TodoRowDone
                    key={item.id}
                    data={item}
                    handleChangeStatus={handleChangeStatus}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
