import './styles.css'

type CanvasProps = {
  id: string
  overlay?: boolean
}

const Canvas = ({ id, overlay }: CanvasProps) => {
  return <canvas id={id} className={`canvas ${overlay ? 'canvas-overlay' : ''}`}></canvas>
}

export default Canvas
