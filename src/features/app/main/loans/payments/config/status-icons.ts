import { Banknote, CreditCard, DollarSign, FileText, type LucideIcon, Receipt } from 'lucide-react'

export const statusIconsAndLabels = {
  efectivo: {
    label: 'Efectivo',
    icon: DollarSign,
    variant: 'success',
  },
  tarjeta: {
    label: 'Tarjeta',
    icon: CreditCard,
    variant: 'brand',
  },
  transferencia: {
    label: 'Transferencia',
    icon: Banknote,
    variant: 'info',
  },
  cheque: {
    label: 'Cheque',
    icon: Receipt,
    variant: 'warning',
  },
  otros: {
    label: 'Otros',
    icon: FileText,
    variant: 'muted',
  },
} as const

export type PaymentMethod = keyof typeof statusIconsAndLabels

export type PaymentMethodIconMeta = {
  label: string
  icon: LucideIcon
  variant: string
}
