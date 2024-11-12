import { Button, Stack } from 'tamagui'
import { Mic, CircleStop } from '@tamagui/lucide-icons'

type RecordButtonProps = {
  onPress: () => void
  isRecording?: boolean
}

export const RecordButton = ({ isRecording, onPress }: RecordButtonProps) => (
  <Button borderRadius={'$12'} onPress={onPress} icon={isRecording ? Mic : CircleStop} />
)
