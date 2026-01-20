"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/forms/inputFied";
import { FooterLink } from "@/components/ui/forms/footerLink";
import { emailRegex } from "@/lib/constants";

function SignIn() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
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
