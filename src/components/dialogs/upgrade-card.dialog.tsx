import { 
    FC, 
    useRef, 
    useEffect,
    useState, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'
import { IShopCard } from '@/types'
import { ArrowSVG } from '@/assets/svg'
import { getIncome, getNextIncome, getUpdatePrice } from '@/services/game.service'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onBuyClick: () => void
  card: IShopCard | null
}

const UpgradeCardDialog: FC<DialogProps> = (props) => {
  const { card, onBuyClick } = props
  
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const [upgradePrice, setUpgradePrice] = useState(1) 
  const [income, setIncome] = useState(1)
  const [upgradeIncome, setUpgradeIncome] = useState(1)

  useEffect(() => { 
    setUpgradePrice(getUpdatePrice(card?.price || 1, card?.level || 1))
    setIncome(getIncome(card?.income || 1, card?.level || 1))
    setUpgradeIncome(getNextIncome(card?.income || 1, card?.level || 1))
  }, [card])

  return (
        <dialog className='modal overflow-hidden' ref={modalRef}>
          <div className='w-full h-screen bottom-0 absolute'>
            <CloseModalBtn handleCancel={onCancel}/>
          <DialogContent>
            <div className='w-full flex flex-col justify-center items-center pt-8'>
                <div className='dialog-title'>Улучшить {card?.name}?</div>
                <div className='font-bold text-3xl text-secondary'>Цена за улучшение: {upgradePrice}</div>
                <div className='font-bold text-md text-primary'>Текущий уровень: {card?.level}</div>
                <div className='font-bold text-md text-primary'>Текущий доход: {income}</div>
                <div className='font-bold text-md text-primary'>Улучшенный доход: {upgradeIncome}</div>
             </div>
             <div className='flex flex-row items-center justify-evenly pt-4'>
               <div 
                 onClick={()=>onBuyClick()} className='btn border-accent flex flex-row items-center justify-center gap-2'>
                 Подтвердить
                 <ArrowSVG />
                 </div>
            </div>
          </DialogContent>
        </div>
    </dialog>
  )
}
export default UpgradeCardDialog