"use client";
import FormInput from "@/components/form/FormInput";
import { memberEditSchema } from "@/libs/schemas/MemberEditSchema";
import { MemberEditFormType } from "@/libs/types/FormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  member: Member;
}

function EditForm({ member }: Props): React.ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditFormType>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  // Populate form fields with data from the member
  React.useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = (data: MemberEditFormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <FormInput
        label="Name"
        variant="bordered"
        register={register}
        fieldName="name"
        error={errors.name}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register("description")}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        disableAutosize
        classNames={{
          input: "resize-y min-h-[100px]",
        }}
      />
      <div className="flex flex-row gap-3">
        <FormInput
          label="City"
          variant="bordered"
          register={register}
          fieldName="city"
          error={errors.city}
        />
        <FormInput
          label="Country"
          variant="bordered"
          register={register}
          fieldName="country"
          error={errors.country}
        />
      </div>
      <Button
        type="submit"
        className="flex self-end bg-pink-600 text-white"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
      >
        Update Profile
      </Button>
    </form>
  );
}

export default EditForm;
