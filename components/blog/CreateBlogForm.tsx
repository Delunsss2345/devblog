"use client";

import { blogSchema, BlogSchemaType } from "@/schemas/BlogSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import AddCover from "./AddCover";

export default function CreateBlogForm({ blog }: { blog?: BlogSchemaType }) {
  const session = useSession();
  const userId = session.data?.user.userId;
  const [uploadCover, setUploadedCover] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog
      ? {
          userId: blog.userId,
          title: blog.title,
          content: blog.content,
          coverImage: blog.coverImage || undefined,
          isPublished: blog.isPublished,
          tags: blog.tags,
        }
      : {
          userId: userId,
          isPublished: false,
        },
  });

  // const onPublish = handleSubmit(async (data) => {
  //   startPublishing(async () => {
  //     const response = await createBlog({
  //       ...data,
  //       isPublished: true,
  //     });

  //     if (response.error) {
  //       setError(response.error);
  //     } else {
  //       setSuccess(response.success);
  //     }
  //   });
  // });

  return (
    <form>
      <AddCover setUploadedCover={setUploadedCover} />
      <FormField
        id="title"
        register={register}
        errors={errors}
        placeholder="Tiêu đề bài viết"
        disable={false}
        inputClassName="border-none text-5xl font-bold bg-transparent"
      />
    </form>
  );
}
