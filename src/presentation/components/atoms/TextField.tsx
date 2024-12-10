import { View } from "react-native"
import { Text, TextInput } from "react-native-paper"

interface TextFieldProps {
    style: any,
    label: string,
    value: string,
    onChangeText: void,
    onPressIn?: void,
    error?: any
}

export const TextField = ({ style, label, value, onChangeText, onPressIn, error }: TextFieldProps) => {
    return (
        <View>
            <TextInput
                label={label}
                style={style}
                value={value}
                onChangeText={onChangeText}
                onPressIn={onPressIn}
                error={error}
            />
            {error != null && (<Text style={{color: 'red' } }>{error}</Text>)}
        </View>

    )
}