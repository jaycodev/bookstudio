import { FilterOption } from "@/types/types";
import { CheckCircle2, XCircle } from "lucide-react";

export const status: FilterOption[] = [
  { label: "Activo", value: "activo", icon: CheckCircle2 },
  { label: "Inactivo", value: "inactivo", icon: XCircle },
];
