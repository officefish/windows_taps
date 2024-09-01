import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onConfirm: () => void
}

const BoostDialog: FC<DialogProps> = (props) => {
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

  const handleBonus = () => {
    setIsOpen(false)
  }

  return (
        <dialog className='modal overflow-hidden' ref={modalRef}>
          <div className='w-full h-screen bottom-0 absolute'>
            <CloseModalBtn handleCancel={onCancel}/>
          <DialogContent>
            <div className='flex flex-col w-full gap-4 items-center justify-center p-4'>
              <p className='text-3xl'>Дневная награда: 300</p>
              <div className="btn btn-secondary btn-lg" onClick={handleBonus}>Забрать награду</div>
            </div>
         
          </DialogContent>
        </div>
    </dialog>
  )
}
export default BoostDialog