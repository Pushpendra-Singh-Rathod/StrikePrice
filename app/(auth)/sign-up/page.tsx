"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/forms/inputField";
import { SelectField } from "@/components/ui/forms/selectField";
import {
  emailRegex,
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { CountrySelectField } from "@/components/ui/forms/countrySelectField";
import { FooterLink } from "@/components/ui/forms/footerLink";
import { toast } from "sonner";
import { signUpwithEmail } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      country: "IN",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpwithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Sign Up Failed ", {
        description:
          error instanceof Error ? error.message : "Failed to Create Account",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Rohit Sharma"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is Required", minLength: 2 }}
        />
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
        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
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
        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your Investment Goal"
          control={control}
          options={INVESTMENT_GOALS}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your Risk Level"
          control={control}
          options={RISK_TOLERANCE_OPTIONS}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your Preferred Industry"
          control={control}
          options={PREFERRED_INDUSTRIES}
          error={errors.preferredIndustry}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : " Start Your Investment Journey"}
        </Button>
        <FooterLink
          text="Already have an account?"
          href="/sign-in"
          linkText="Sign In"
        ></FooterLink>
      </form>
    </>
  );
}

export default SignUp;
