import { z } from "zod";

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string().min(1)
});

export type Quiz = z.infer<typeof QuizSchema>;