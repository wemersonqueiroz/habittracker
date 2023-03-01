import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import HabitDay from "./HabitDay"

function SummaryTable() {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  const summaryDates = generateDatesFromYearBeginning()

  const minimumSummaryDatesSize = 18 * 7
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekday, index) => {
          return (
            <div
              key={index}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
              {weekday}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return (
            <HabitDay
              key={date.toString()}
              completed={1}
              amount={Math.round(Math.random() * 5)}
            />
          )
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h-10 bg-zinc-900 border2 border-l-zinc-800 rounded-lg cursor-not-allowed opacity-40"></div>
            )
          })}
      </div>
    </div>
  )
}

export default SummaryTable
