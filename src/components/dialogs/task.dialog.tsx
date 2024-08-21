import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { ArrowSVG, SearchSVG } from '@/assets/svg'
import { IUserTask } from '@/types'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onCheckClick: () => void
  onJoinClick: () => void
  task: IUserTask
}

const TaskDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onCheckClick,
    onJoinClick,
    task
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
                   <div className='dialog-title'>{task.data.name}</div>
                   <div className='font-bold text-3xl text-secondary'>+{task.data.rewards}</div>
             </div>
             <div className='flex flex-row items-center justify-evenly pt-4'>
               <div 
                 onClick={()=>onJoinClick()} className='btn border-accent flex flex-row items-center justify-center gap-2'>
                 Подписаться
                 <ArrowSVG />
                 </div>
               <div 
                 onClick={()=>onCheckClick()} 
                 className='btn border-accent flex flex-row items-center justify-center gap-2'>
                 Посмотреть
                 <SearchSVG />
                  {/* <object 
    //             data="/icons/svg/lucide_search.svg" 
    //             type="image/svg+xml"></object>  */}
               </div>
            </div>
          </DialogContent>
        </div>
    </dialog>
  )
}
export default TaskDialog

