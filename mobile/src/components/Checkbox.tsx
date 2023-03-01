import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

interface Props extends TouchableOpacityProps {
  title: string
  checked?: boolean
}
function Checkbox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}>
      {checked ? (
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center border-2 border-zinc-800">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg items-center justify-center border-2 border-zinc-800"></View>
      )}

      <Text className="text-white ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

export default Checkbox
