import { useForm } from "react-hook-form";
import { loginAccount } from "../../apis/authApi";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: (data) => loginAccount(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data.token);
    },
    onError: (data) => {
      setError("password", {
        type: "server",
        message: data?.response?.data?.messages.error
      });
    },
    onSettled: () => {
      if (!errors.password) {
        navigate("/");
      }
    }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
    reset({
      password: ""
    });
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
            placeholder="name@company.com"
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-red-500">This is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-red-500">This is required</span>
          )}
          {errors.password && errors.password.type === "server" && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?
          <Link
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            to={"/register"}
          >
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}
