import * as Checkbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react"
import { FormEvent, useState } from "react"
import api from "../lib/axios"

const availableWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function NewHabitForm() {
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return
    }
    await api.post("habits", {
      title,
      weekDays,
    })

    setTitle("")
    setWeekDays([])

    alert("Habit created!")
  }

  function handleToogleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="flex flex-col w-full mt-6">
      <label htmlFor="title" className="leading-tight font-semibold">
        What is your new habit?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex. : Exercises, sleep 8 hours, etc...
        "
        className="p-4  rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label className="leading-tight font-semibold mt-4 mb-2" htmlFor="">
        Which frequency?
      </label>
      {availableWeekDays.map((day, index) => (
        <div key={day} className="flex flex-col gap-3">
          <Checkbox.Root
            className="relative flex items-center gap-3 group w-full"
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToogleWeekDay(index)}>
            <div className="absolute left-0 h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="ml-6 leading-tight text-white font-bold">
              {day}
            </span>
          </Checkbox.Root>
        </div>
      ))}
      <button
        className="mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500 flex items-center"
        type="submit">
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  )
}

export default NewHabitForm
