import { FilterOption } from "@/types/types";
import { CheckCircle2, XCircle } from "lucide-react";

export const nationalities: FilterOption[] = [
  { label: "Argentina", value: "Argentina" },
  { label: "España", value: "España" },
  { label: "México", value: "México" },
  { label: "Estados Unidos", value: "Estados Unidos" },
  { label: "Reino Unido", value: "Reino Unido" },
  { label: "Francia", value: "Francia" },
];

export const genres: FilterOption[] = [
  { label: "Ficción", value: "Ficción" },
  { label: "Novela", value: "Novela" },
  { label: "Literatura contemporánea", value: "Literatura contemporánea" },
  { label: "Ensayo", value: "Ensayo" },
  { label: "Ciencias sociales", value: "Ciencias sociales" },
  { label: "Educativo", value: "Educativo" },
  { label: "Best Sellers", value: "Best Sellers" },
  { label: "Fantasía", value: "Fantasía" },
  { label: "No ficción", value: "No ficción" },
  { label: "Ciencia ficción", value: "Ciencia ficción" },
  { label: "Académico", value: "Académico" },
  { label: "Misterio", value: "Misterio" },
  { label: "Infantil", value: "Infantil" },
  { label: "Cuentos", value: "Cuentos" },
  { label: "Poesía", value: "Poesía" },
  { label: "Narrativa", value: "Narrativa" },
  { label: "Política", value: "Política" },
  { label: "Historia", value: "Historia" },
  { label: "Narrativa contemporánea", value: "Narrativa contemporánea" },
  { label: "Literatura universal", value: "Literatura universal" },
  { label: "Biografía", value: "Biografía" },
  { label: "Humor", value: "Humor" },
];

export const status: FilterOption[] = [
  { label: "Activo", value: "activo", icon: CheckCircle2 },
  { label: "Inactivo", value: "inactivo", icon: XCircle },
];
