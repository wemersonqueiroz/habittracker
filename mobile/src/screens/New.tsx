import { useState } from "react"
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import BackButton from "../components/BackButton"
import Checkbox from "../components/Checkbox"
import { Feather } from "@expo/vector-icons"

import colors from "tailwindcss/colors"
import { api } from "../lib/axios"
const availableWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function New() {
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState =>
        prevState.filter(weekDay => weekDay !== weekDayIndex)
      )
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim || weekDays.length === 0) {
        return Alert.alert(
          "New Habit",
          "Inform the habit name and select at least one day"
        )
      }
      await api.post("/habits", {
        title,
        weekDays,
      })
      setTitle("")
      setWeekDays([])
      Alert.alert("New Habit", "Habit created successfully")
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", "Can't create habit")
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          New Habit
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          What is your new Habit?{" "}
        </Text>
        <TextInput
          placeholder="ex.: Exercises, sleep 8 hours, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600 "
        />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Which frequency?{" "}
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
          className="flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6">
          <Feather name="check" size={20} color={colors.white} />
          <Text className="ml-2 text-white font-semibold text-base">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default New
