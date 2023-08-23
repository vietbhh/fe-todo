import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const registerMutation = useMutation({
    mutationFn: (data) => registerAccount(data),
    onSuccess: () => {
      navigate("/login");
    }
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Register
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
            placeholder="username"
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors.username && errors.username.type === "required" && (
            <span className="text-red-500">This is required</span>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <span className="text-red-500">This is invalid</span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
            placeholder="name@company.com"
            {...register("email", { required: true, minLength: 8 })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-red-500">This is required</span>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <span className="text-red-500">This is invalid</span>
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
            {...register("password", { required: true, minLength: 5 })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-red-500">This is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-red-500">This is invalid</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="••••••••"
            {...register("confirm_password", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
          />
          {errors.confirm_password &&
            errors.confirm_password.type === "required" && (
              <span className="text-red-500">This is required</span>
            )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
        >
          Sign up
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?
          <a
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign in
          </a>
        </p>
      </form>
    </>
  );
}
