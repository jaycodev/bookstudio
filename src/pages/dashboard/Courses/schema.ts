import { z } from "zod";

export const courseSchema = z.object({
  CourseID: z.number(),
  Name: z.string(),
  Level: z.string(),
  Description: z.string(),
  Status: z.enum(["activo", "inactivo"]),
});

export type Course = z.infer<typeof courseSchema>;
