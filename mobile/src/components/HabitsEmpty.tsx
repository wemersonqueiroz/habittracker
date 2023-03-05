import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

function HabitsEmpty() {
  const { navigate } = useNavigation()

  return (
    <Text className="text-zinc-400 text-base">
      There is no habit to track{" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate("New")}>
        start creating one.
      </Text>
    </Text>
  )
}

export default HabitsEmpty
