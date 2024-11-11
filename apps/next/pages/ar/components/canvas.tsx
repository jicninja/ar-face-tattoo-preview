import './styles.css'

type CanvasProps = {
  id: string
  overlay?: boolean
}

export default function Canvas({ id, overlay }: CanvasProps) {
  return <canvas id={id} className={`canvas ${overlay ? 'canvas-overlay' : ''}`}></canvas>
}
