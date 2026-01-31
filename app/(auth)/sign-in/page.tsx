"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/forms/inputField";
import { FooterLink } from "@/components/ui/forms/footerLink";
import { emailRegex } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInwithEmail } from "@/lib/actions/auth.action";

function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInwithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed ", {
        description:
          error instanceof Error ? error.message : "Failed to Sihn In",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Log in Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is Required",
            pattern: {
              value: emailRegex,
              message: "Email is Required",
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Password is required"
          register={register}
          error={errors.password}
          type="password"
          validation={{ required: "Password is Required", minLength: 8 }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>
        <FooterLink
          text="Don't have an account?"
          href="/sign-up"
          linkText="Create an Account"
        ></FooterLink>
      </form>
    </>
  );
}

export default SignIn;
