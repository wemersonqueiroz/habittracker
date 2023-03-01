import { Check } from "phosphor-react"

function NewHabitForm() {
  return (
    <form className="flex flex-col w-full mt-6">
      <label htmlFor="title" className="leading-tight font-semibold">
        What is your new habit?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex. : Exercises, sleep 8 hours, etc...
        "
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label className="leading-tight font-semibold mt-4" htmlFor="">
        Which frequency?
      </label>

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
