import { useSiteStore } from "@/providers/store";
import { IUserTask, Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react"

import { TaskFacebookSVG, TaskInstagramSVG, TaskTelegramSVG } from "@/assets/svg"
import { allTasks, dailyTasks } from "@/mocks/tasks";
import TaskDialog from "@/components/dialogs/task.dialog";
import { apiFetch } from "@/services/api";
import useUpdateTasks from "@/hooks/api/useUpdateTasks";

const Tasks: FC = () => {

  const { setPage } = useSiteStore()
  const { updateTasks } = useUpdateTasks(apiFetch) 

  useEffect(() => {
    updateTasks()
  }, [updateTasks])

  useEffect(() => {
      setPage(Page.TASKS)
  }, [setPage])

  const [dTasks,] = useState(dailyTasks)
  const [aTasks,] = useState(allTasks)
  const [balance,] = useState(124)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [currentTask, setCurrentTask] = useState<IUserTask>(allTasks[0])

  const handleTaskClick = (task: IUserTask) => {
      //console.log(task)
      setCurrentTask(task)
      setIsDialogOpen(true)
  }

  const handleCheckClick = () => {
      //
  }

  const handleJoinClick = () => {
      //
  }

    return (
      <div className="overflow-y-scroll h-screen">
      <div>
          <h1 className="w-full text-center">Задания</h1>
      </div>
      <div className="mt-2 pussy-stats px-2 pb-2 w-full">
                    <UserBalance balance={balance} />
                </div>
                <div className="spacer"></div>
                <div className="tasks-title">Daily tasks:</div>
                {dTasks.length > 0 && <TasksList 
                tasks={dTasks} 
                onTaskCLicked={handleTaskClick} />}
                <div className="spacer"></div>
                <div className="tasks-title">All tasks:</div>
                {dTasks.length > 0 && <TasksList 
                tasks={aTasks} 
                onTaskCLicked={handleTaskClick}
                />}
        <TaskDialog 
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            onCheckClick={handleCheckClick}
            onJoinClick={handleJoinClick}
            task={currentTask}
            />
    
  </div>  )
}
export default Tasks

interface IUserBalanceProps {
  balance: number
}

const UserBalance: FC<IUserBalanceProps> = (props) => {
  const { balance } = props

  return (
      <div className="
      gap-2 bg-accent rounded-lg mt-4 py-4 w-full 
      ">
        <div className="h-5 w-full text-base-100 font-bold text-xl text-center">Баланс</div>
        <div className="
        flex flex-row items-center justify-center 
        gap-2 mt-2
        font-bold text-3xl text-center
        text-base-100
        ">
              {/* <div className="stats-currency">
                  <img src="/icons/png/brand.png" alt="stats currency" />
              </div> */}
               {balance}
        </div>
      </div>
  )
}


interface TaskListsProps {
  tasks: IUserTask[]
  onTaskCLicked: (task: IUserTask) => void
}

const TasksList : FC<TaskListsProps> = (props) => {
  const { tasks, onTaskCLicked } = props
  return <div className="mt-2 px-4 w-full flex flex-col gap-4">
      {tasks.map((task, index) => <TaskItem 
          key={index} 
          task={task} 
          onClick={onTaskCLicked}
          />)}
  </div>
}

interface TaskItemProps {
  task: IUserTask
  onClick: (task: IUserTask) => void
}



const TaskItem : FC<TaskItemProps> = (props) => {
  const { task, onClick } = props
  const { 
    id,
    data, 
      //isDifficult, 
     // endDate 
  } = task
  const { name, rewards } = data

  const completed = false
  
  const handleTaskClick = (e: SyntheticEvent<HTMLDivElement>) => {
      e.preventDefault()
      onClick(task)
  }

  return <div onClick={handleTaskClick} className={`btn w-full flex flex-row items-center justify-between h-[62px] ${completed? "bg-base-300" : "bg-base-100"}`}>
      <div className="flex flex-row gap-2 items-center justify-center">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
              {/* <img className="w-[36px] h-[36px]" src={icon} alt="task" /> */}
              <Icon id={id} />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
              <div className="task-job">{name}</div>
              <div className={`task-baunty ${completed? "text-[#CDA6FF]" : ""}`}>+ {rewards}</div>
          </div>
      </div>
      
      <div className="">{completed 
      ? <div className="w-8 h-8 flex items-center justify-center">
              <img className="w-6 h-6" src="/icons/png/check.png" alt="check" />
          </div> 
      : <div className="w-8 h-8">
              <img className="w-6 h-6" src="/icons/png/unchecked.png" alt="check" />
        </div>}
      </div>
  </div>
}

interface GetIconProps {
  id: number
}

const Icon:FC<GetIconProps> = (props) => {
  switch (props.id) {
      case 0:
          return <TaskTelegramSVG />
      case 1:
          return <TaskInstagramSVG />
      case 2:
          return <TaskFacebookSVG /> 
      default:
          return <TaskTelegramSVG />
  }
}