import { useEffect, useState } from "react"

type BoardProps = { boardContainerRef: React.RefObject<HTMLDivElement> }
type SquareSize = { width: number, height: number }

const baseArray = Array(8).fill(0).map((_, i) => i + 1);
const rows: number[] = Array.from(baseArray).reverse();
const columns: string[] = Array.from(baseArray).map(row => String.fromCharCode(96 + row))

const getSquareSize = (value: number): SquareSize => ({ width: value, height: value })

function Board({ boardContainerRef }: BoardProps) {

  const [boardSize, setBoardSize] = useState(0)
  const [squareSize, setSquareSize] = useState(0)
  
  useEffect(() => {
    const handleResize = () => {
      const { width, height } = boardContainerRef.current?.getBoundingClientRect() || { width: 0, height: 0 }
      const _boardSize = Math.min(width, height)
      setBoardSize(_boardSize)
      setSquareSize(_boardSize / 8)
    }
    handleResize()
    window.addEventListener('resize', handleResize)    
    return () => window.removeEventListener('resize', handleResize)
  }, [boardContainerRef])

  return (
    <section 
      style={getSquareSize(boardSize)}
      className="grid grid-cols-8 gap-0 rounded-sm overflow-hidden">
      {
        rows.map((row, i) => (
          columns.map((col, j) => {
            const color = (i + j) % 2 === 0 ? 'bg-base-500' : 'bg-base-200'
            return (
              <div 
                key={`square_${col+row}`}
                style={getSquareSize(squareSize)}
                className={`h-14 w-14 flex justify-center items-center ${color}`}>
              <p className="text-base-950">{col+row}</p>
            </div>
            )
          })
        ))
      }
    </section>
  );
};

export default Board;