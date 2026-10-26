import { z } from "zod";

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  questions: z.array(
    z.object({
      id: z.string(),
      prompt: z.string(),
      options: z.array(z.string()),
      correctOptionIndex: z.number().int(),
      timeLimitSeconds: z.number().default(20)
    })
  )
});

export type Quiz = z.infer<typeof QuizSchema>;