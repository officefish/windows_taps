import { 
    FC, 
    useRef, 
    useEffect, 
} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import { ArrowSVG, SearchSVG } from '@/assets/svg'
import { ITask } from '@/types'
import CloseModalBtn from '../button/close-modal.btn'
import DialogContent from './dialog.content'

interface PendingTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onNavigateClick: () => void
  task: ITask
}

export const PendingTaskDialog: FC<PendingTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onNavigateClick,
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
                   <div className='dialog-title'>{task.templateTask.title}</div>
                   <div className='font-bold text-3xl text-secondary'>+{task.templateTask.baunty}</div>
             </div>
             <div className='flex flex-row items-center justify-evenly pt-4'>
               <div 
                 onClick={()=>onNavigateClick()} 
                 className='btn border-accent flex flex-row items-center justify-center gap-2'>
                 Посмотреть
                 {/* <SearchSVG /> */}
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

interface ReadyTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onReadyClick: () => void
  task: ITask
}

export const ReadyTaskDialog: FC<ReadyTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReadyClick,
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
                   <div className='dialog-title'>{task.templateTask.title}</div>
                   <div className='font-bold text-3xl text-secondary'>+{task.templateTask.baunty}</div>
                   <div className='font-bold text-md text-info py-2'>Задание выполнено. Заберите награду!</div>

             </div>
             <div className='flex flex-row items-center justify-evenly pt-4'>
               <div 
                 onClick={()=>onReadyClick()} className='btn border-accent flex flex-row items-center justify-center gap-2'>
                 Забрать
                 <ArrowSVG />
                 </div>
            </div>
          </DialogContent>
        </div>
    </dialog>
  )
}
