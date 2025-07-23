import { z } from "zod";

export const studentSchema = z.object({
  StudentID: z.number(),
  DNI: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Phone: z.string().optional(),
  Email: z.string(),
  Status: z.enum(["activo", "inactivo"]),
});

export type Student = z.infer<typeof studentSchema>;
