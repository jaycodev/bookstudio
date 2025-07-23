import { FilterOption } from "@/types/types";
import { ShieldUser, BookUser } from "lucide-react";

export const roles: FilterOption[] = [
  { label: "Administrador", value: "administrador", icon: ShieldUser },
  { label: "Bibliotecario", value: "bibliotecario", icon: BookUser },
];
