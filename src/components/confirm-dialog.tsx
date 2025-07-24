import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRef } from "react";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  to?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  onConfirm,
  to,
  open,
  onOpenChange,
  children,
}: ConfirmDialogProps) {
  const actionButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          actionButtonRef.current?.focus();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          {to ? (
            <AlertDialogAction asChild ref={actionButtonRef}>
              <Link to={to}>{confirmLabel}</Link>
            </AlertDialogAction>
          ) : (
            <AlertDialogAction ref={actionButtonRef} onClick={onConfirm}>
              {confirmLabel}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
