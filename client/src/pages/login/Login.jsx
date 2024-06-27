import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/authSlice";
import { toast } from "sonner";
import Loader from "../loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const postData = async (values) => {
    const response = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    return await response.json();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      if (data?.jwtToken) {
        dispatch(
          updateCurrentUser({
            email: data.user.email,
            authorId: data.user.id,
            role: data.user.role,
          })
        );
        dispatch(updateIsLoggedIn(true));
        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error(data?.message || "Login failed");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full h-screen items-center border-2 bg-[#f3f4f6]">
      <h1 className="text-2xl font-bold pb-[10px] pt-[20px] text-gray-500">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 px-[60px] py-[30px] bg-white shadow-md rounded-sm"
        >
          <h1>Sign in to start your session</h1>
          <FormField
            className="w-full"
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="flex justify-center items-center" type="submit">
            Submit
          </Button>
          <Link
            to="/forgetpassword"
            className="flex justify-end text-blue-700 underline hover:text-red-400"
          >
            Forget password?
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default Login;
