import { z } from "zod";

export const publisherSchema = z.object({
  PublisherID: z.number(),
  Name: z.string(),
  NationalityName: z.string(),
  LiteraryGenreName: z.string(),
  Status: z.enum(["activo", "inactivo"]),
  Photo: z.string().optional(),
});

export type Publisher = z.infer<typeof publisherSchema>;
