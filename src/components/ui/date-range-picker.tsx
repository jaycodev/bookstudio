import * as React from 'react'
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | null
  onDateSelect: (date: DateRange | undefined) => void
  placeholder?: string
  startYear?: number
  endYear?: number
}

export function DateRangePicker({
  date,
  onDateSelect,
  placeholder,
  className,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DateRangePickerProps) {
  const [leftMonth, setLeftMonth] = React.useState<Date>(date?.from || new Date())
  const [rightMonth, setRightMonth] = React.useState<Date>(() => {
    const firstMonth = date?.from || new Date()
    if (getMonth(firstMonth) === 11) {
      return setYear(setMonth(new Date(), 0), getYear(firstMonth) + 1)
    }
    return setMonth(new Date(firstMonth), getMonth(firstMonth) + 1)
  })

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)

  const handleLeftMonthChange = (month: string) => {
    const newDate = setMonth(leftMonth, months.indexOf(month))
    setLeftMonth(newDate)
  }

  const handleLeftYearChange = (year: string) => {
    const newDate = setYear(leftMonth, parseInt(year))
    setLeftMonth(newDate)
  }

  const handleRightMonthChange = (month: string) => {
    const newDate = setMonth(rightMonth, months.indexOf(month))
    setRightMonth(newDate)
  }

  const handleRightYearChange = (year: string) => {
    const newDate = setYear(rightMonth, parseInt(year))
    setRightMonth(newDate)
  }

  React.useEffect(() => {
    if (date?.from) {
      setLeftMonth(date.from)

      if (date.to) {
        setRightMonth(date.to)
      } else {
        if (getMonth(date.from) === 11) {
          setRightMonth(setYear(setMonth(new Date(), 0), getYear(date.from) + 1))
        } else {
          setRightMonth(setMonth(setYear(new Date(), getYear(date.from)), getMonth(date.from) + 1))
        }
      }
    }
  }, [date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            id="date"
            variant="outline"
            className={cn(
              'w-[260px] justify-start text-left font-normal',
              !date?.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd LLL y', { locale: es })} -{' '}
                  {format(date.to, 'dd LLL y', { locale: es })}
                </>
              ) : (
                format(date.from, 'dd LLL y', { locale: es })
              )
            ) : (
              (placeholder ?? 'Selecciona un rango de fechas')
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between p-2 gap-2">
                  <Select onValueChange={handleLeftMonthChange} value={months[getMonth(leftMonth)]}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={handleLeftYearChange}
                    value={getYear(leftMonth).toString()}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="range"
                  selected={date ?? undefined}
                  onSelect={onDateSelect}
                  month={leftMonth}
                  onMonthChange={setLeftMonth}
                  locale={es}
                  showOutsideDays={true}
                  numberOfMonths={1}
                  captionLayout="buttons"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between p-2 gap-2">
                  <Select
                    onValueChange={handleRightMonthChange}
                    value={months[getMonth(rightMonth)]}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={handleRightYearChange}
                    value={getYear(rightMonth).toString()}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="range"
                  selected={date ?? undefined}
                  onSelect={onDateSelect}
                  month={rightMonth}
                  onMonthChange={setRightMonth}
                  locale={es}
                  showOutsideDays={true}
                  numberOfMonths={1}
                  captionLayout="buttons"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
