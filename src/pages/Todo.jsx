import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoAdd, TodoRowDone, TodoRowWork } from "../components/Todo";
import { deleteTodo, getTodos, updateStatusTodo } from "../apis/todoApi";
import { SkeletonDefault } from "../components/Skeleton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/helper";

export default function Todo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
    keepPreviousData: true
  });

  const data = todoQuery?.data?.data;

  const handleChangeStatus = useMutation({
    mutationFn: (id) => updateStatusTodo(id),
    onSuccess: () => {
      queryClient.prefetchQuery({ queryKey: ["todos"] });
    },
    onError(error) {
      if (error?.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  });

  const handleDelete = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.prefetchQuery({ queryKey: ["todos"] });
    },
    onError(error) {
      if (error?.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (todoQuery.isError && todoQuery.error?.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [todoQuery]);

  return (
    <>
      <section>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 fixed right-1/3 top-2 text-red-600 cursor-pointer"
          onClick={() => handleLogout()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </section>
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
    </>
  );
}
