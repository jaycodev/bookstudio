import { FilterOption } from "@/types/types";
import { CheckCircle2, XCircle } from "lucide-react";

export const authors: FilterOption[] = [
  { label: "Gabriel García Márquez", value: "Gabriel García Márquez" },
  { label: "Julio Cortázar", value: "Julio Cortázar" },
  { label: "Mario Vargas Llosa", value: "Mario Vargas Llosa" },
  { label: "Juan Rulfo", value: "Juan Rulfo" },
  { label: "Miguel de Cervantes", value: "Miguel de Cervantes" },
  { label: "Ernesto Sabato", value: "Ernesto Sabato" },
  { label: "Jorge Luis Borges", value: "Jorge Luis Borges" },
  { label: "Mario Benedetti", value: "Mario Benedetti" },
  { label: "Carlos Fuentes", value: "Carlos Fuentes" },
  { label: "Alejo Carpentier", value: "Alejo Carpentier" },
  { label: "Isabel Allende", value: "Isabel Allende" },
  { label: "Adolfo Bioy Casares", value: "Adolfo Bioy Casares" },
  { label: "Mariano Azuela", value: "Mariano Azuela" },
  { label: "Octavio Paz", value: "Octavio Paz" },
  { label: "Anónimo", value: "Anónimo" },
  { label: "Miguel Ángel Asturias", value: "Miguel Ángel Asturias" },
  { label: "Rosario Castellanos", value: "Rosario Castellanos" },
];

export const publishers: FilterOption[] = [
  { label: "Sudamericana", value: "Sudamericana" },
  { label: "Editorial Sudamericana", value: "Editorial Sudamericana" },
  { label: "Seix Barral", value: "Seix Barral" },
  { label: "Fondo de Cultura Económica", value: "Fondo de Cultura Económica" },
  { label: "Francisco de Robles", value: "Francisco de Robles" },
  { label: "Editorial Sur", value: "Editorial Sur" },
  { label: "Editorial Proa", value: "Editorial Proa" },
  { label: "Arca", value: "Arca" },
  { label: "Losada", value: "Losada" },
  { label: "Editorial Oveja Negra", value: "Editorial Oveja Negra" },
  { label: "Oveja Negra", value: "Oveja Negra" },
  { label: "Plaza & Janés", value: "Plaza & Janés" },
  { label: "Editorial Porrúa", value: "Editorial Porrúa" },
  { label: "Editorial Universitaria", value: "Editorial Universitaria" },
];

export const status: FilterOption[] = [
  { label: "Activo", value: "activo", icon: CheckCircle2 },
  { label: "Inactivo", value: "inactivo", icon: XCircle },
];
