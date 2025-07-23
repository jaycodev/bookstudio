import { FilterOption } from "@/types/types"
import { Loader, CheckCircle2 } from "lucide-react"

export const studentDnis: FilterOption[] = [
  { label: "Juan Pérez - 60916631", value: "Juan Pérez - 60916631" },
  { label: "Lucía Gómez - 72103412", value: "Lucía Gómez - 72103412" },
  { label: "Carlos Ruiz - 65321098", value: "Carlos Ruiz - 65321098" },
  { label: "Sofía Herrera - 64890011", value: "Sofía Herrera - 64890011" },
  { label: "Martín Díaz - 73215649", value: "Martín Díaz - 73215649" },
  { label: "Ana Torres - 65980123", value: "Ana Torres - 65980123" },
  { label: "Diego Navarro - 61234567", value: "Diego Navarro - 61234567" },
  { label: "Clara Campos - 70122345", value: "Clara Campos - 70122345" },
  { label: "Esteban Vidal - 69876543", value: "Esteban Vidal - 69876543" },
  { label: "Valentina Ríos - 69001122", value: "Valentina Ríos - 69001122" },
  { label: "Felipe Mora - 64566778", value: "Felipe Mora - 64566778" },
  { label: "Daniela Castro - 63457890", value: "Daniela Castro - 63457890" },
  { label: "Tomás Rivas - 67789900", value: "Tomás Rivas - 67789900" },
  { label: "Marta Luján - 69998877", value: "Marta Luján - 69998877" },
  { label: "Agustín Bravo - 64442233", value: "Agustín Bravo - 64442233" },
  { label: "Laura Peña - 67889910", value: "Laura Peña - 67889910" },
  { label: "Nicolás Sosa - 70011234", value: "Nicolás Sosa - 70011234" },
  { label: "Jimena Vidal - 61239087", value: "Jimena Vidal - 61239087" },
  { label: "Pedro Sánchez - 65678900", value: "Pedro Sánchez - 65678900" },
  { label: "Romina Delgado - 69990123", value: "Romina Delgado - 69990123" },
  { label: "Iván Cáceres - 68881234", value: "Iván Cáceres - 68881234" },
  { label: "Verónica Reyes - 69009876", value: "Verónica Reyes - 69009876" },
  { label: "Sebastián Herrera - 67991122", value: "Sebastián Herrera - 67991122" },
  { label: "María Beltrán - 63345567", value: "María Beltrán - 63345567" },
  { label: "Andrés Romero - 68990012", value: "Andrés Romero - 68990012" }
]

export const status: FilterOption[] = [
  { label: "Prestado", value: "prestado", icon: Loader },
  { label: "Devuelto", value: "devuelto", icon: CheckCircle2 },
]
