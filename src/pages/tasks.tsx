import { useSiteStore } from "@/providers/store";
import { ITask, Page } from "@/types";
import { FC, SyntheticEvent, useEffect, useState } from "react"

import { TaskFacebookSVG, TaskInstagramSVG, TaskTelegramSVG } from "@/assets/svg"
import TaskDialog from "@/components/dialogs/task.dialog";
import { useUserStore } from "@/providers/user";
//import { apiFetch } from "@/services/api";
//import useValidateTasks from "@/hooks/api/useValidateTasks";

const Tasks: FC = () => {

  const { setPage } = useSiteStore()
  //const { validateTasks } = useValidateTasks(apiFetch) 

  // useEffect(() => {
  //   validateTasks()
  // }, [validateTasks])

  useEffect(() => {
      setPage(Page.TASKS)
  }, [setPage])

  const { dailyTasks, seasonTasks } = useUserStore()
  const [balance,] = useState(124)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [currentTask, setCurrentTask] = useState<ITask>(seasonTasks[0])

  const handleTaskClick = (task: ITask) => {
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
                {dailyTasks.length > 0 && <TasksList 
                tasks={dailyTasks} 
                onTaskCLicked={handleTaskClick} />}
                <div className="spacer"></div>
                <div className="tasks-title">All tasks:</div>
                {seasonTasks.length > 0 && <TasksList 
                tasks={seasonTasks} 
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
  tasks: ITask[]
  onTaskCLicked: (task: ITask) => void
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
  task: ITask
  onClick: (task: ITask) => void
}



const TaskItem : FC<TaskItemProps> = (props) => {
  const { task, onClick } = props  
  const { title, baunty } = task.templateTask

  const completed = false
  
  const handleTaskClick = (e: SyntheticEvent<HTMLDivElement>) => {
      e.preventDefault()
      onClick(task)
  }

  return <div onClick={handleTaskClick} className={`btn w-full flex flex-row items-center justify-between h-[62px] ${completed? "bg-base-300" : "bg-base-100"}`}>
      <div className="flex flex-row gap-2 items-center justify-center">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
              {/* <img className="w-[36px] h-[36px]" src={icon} alt="task" /> */}
              <Icon id={0} />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
              <div className="task-job">{title}</div>
              <div className={`task-baunty ${completed? "text-[#CDA6FF]" : ""}`}>+ {baunty}</div>
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