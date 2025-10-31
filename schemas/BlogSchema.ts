import { z } from "zod";

export const blogSchema = z.object({
  userId: z.string(),
  title: z.string().min(10, "Tiêu đề quá ngắn").max(150, "Tiêu đề quá dài"),
  content: z.string().min(10, "Nội dung quá ngắn"),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z.array(z.string()),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;
