
import { AppLayout } from "@/components/app/app-layout";
import { TaskCompleteScreen } from "@/components/app/task-complete-screen";
import { useLocation } from "react-router-dom";
import { getRandomMotivationalMessage } from "@/utils/motivational-messages";

const TaskComplete = () => {
  const location = useLocation();
  const message = location.state?.message || getRandomMotivationalMessage();
  const taskTitle = location.state?.taskTitle || "";
  
  return (
    <AppLayout>
      <TaskCompleteScreen message={message} taskTitle={taskTitle} />
    </AppLayout>
  );
};

export default TaskComplete;
