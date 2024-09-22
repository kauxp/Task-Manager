"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "/kanban",
    label: "Kanban Board"
  },
  {
    value: "/task",
    label: "Task List"
  },
]

export function ViewOptions() {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null);
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-gray-300">Select View</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start text-white"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.label}
              </>
            ) : (
              <>View Options</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      const selected = statuses.find((priority) => priority.value === value) || null;
                      setSelectedStatus(selected);
                      setOpen(false);
                      if (selected) {
                        router.push(selected.value);
                      }
                    }}
                  >
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
