import * as React from 'react'
import { Check, PlusCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { cn } from '@lib/utils'
import { Badge } from '@components/ui/Badge'
import { Button } from '@components/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@components/ui/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover'
import { Separator } from '@components/ui/Separator'

interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilterProps {
  title?: string
  options: Option[]
  filterKey: string
  facets?: Map<string, number>
}

export function DataTableFacetedFilter({
  title,
  options,
  filterKey,
  facets,
}: DataTableFacetedFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedValues = new Set(searchParams.getAll(filterKey))

  const updateSearchParams = (newValues: string[]) => {
    const params = new URLSearchParams(searchParams)
    params.delete(filterKey)
    newValues.forEach((val) => {
      params.append(filterKey, val)
    })
    setSearchParams(params)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="h-4 w-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSelected = new Set(selectedValues)
                      if (isSelected) {
                        newSelected.delete(option.value)
                      } else {
                        newSelected.add(option.value)
                      }
                      updateSearchParams(Array.from(newSelected))
                    }}
                  >
                    <div
                      className={cn(
                        'border-primary flex h-4 w-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="text-muted-foreground h-4 w-4" />
                    )}
                    <span>{option.label}</span>
                    {facets && facets.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => updateSearchParams([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
