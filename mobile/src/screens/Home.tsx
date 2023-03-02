import { useNavigation } from "@react-navigation/native"
import { Text, View, ScrollView, Alert } from "react-native"

import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning"

import HabitDay, { DAY_SIZE } from "../components/HabitDay"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { Loading } from "../components/Loading"
import dayjs from "dayjs"

const weekDays = ["S", "M", "T", "W", "T", "F", "S"]
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)
  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get("/summary")
      setSummary(response.data)
    } catch (error) {
      Alert.alert("Ops", "Can't fetch data")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            style={{ width: DAY_SIZE }}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            key={`${weekDay}-${index}`}>
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        {summary && (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map(date => {
              const dayWithHabits = summary?.find(day => {
                return dayjs(date).isSame(day.date, "day")
              })
              return (
                <HabitDay
                  key={date.toISOString()}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountedCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("Habit", { date: date.toISOString() })
                  }
                />
              )
            })}
            {amountOfDaysToFill > 0 &&
              Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}></View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Home
