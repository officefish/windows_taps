import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'
import { IShopCard } from '@/types'
import { ArrowSVG } from '@/assets/svg'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onBuyClick: () => void
  card: IShopCard | null
}

const BuyCardDialog: FC<DialogProps> = (props) => {
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

  return (
        <dialog className='modal overflow-hidden' ref={modalRef}>
          <div className='w-full h-screen bottom-0 absolute'>
            <CloseModalBtn handleCancel={onCancel}/>
          <DialogContent>
            <div className='w-full flex flex-col justify-center items-center pt-8'>
                  
                   <div className='dialog-title'>Купить {card?.name}?</div>
                   <div className='font-bold text-3xl text-secondary'>Цена: {card?.price}</div>
                   <div className='font-bold text-md text-primary'>Уровень: {card?.level || 1}</div>
                   <div className='font-bold text-md text-primary'>Пассивный доход: {card?.income} (за десятый уровень)</div>
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
export default BuyCardDialog