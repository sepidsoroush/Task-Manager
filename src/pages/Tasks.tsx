import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconPlayerPause, IconRun, IconCircleCheck } from "@tabler/icons-react";
import TasksColumns from "@/components/tasks/TasksCols";
import NewBoard from "@/components/boards/NewBoard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchBoardsWithTasks,
  setActiveBoard,
  updateTask,
} from "@/store/boards-actions";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/models";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const {
    items: boards,
    activeBoardId,
    status: loadingStatus,
  } = useAppSelector((state) => state.boards);
  const isLoading = loadingStatus === "loading";

  const [selectedTab, setSelectedTab] = useState<string>(activeBoardId || "");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    dispatch(setActiveBoard(value));
  };

  useEffect(() => {
    dispatch(fetchBoardsWithTasks());
  }, [dispatch]);

  useEffect(() => {
    if (activeBoardId) {
      setSelectedTab(activeBoardId);
    }
  }, [activeBoardId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const task = active.data.current?.task as Task | undefined;
    const newStatus = over.id as string;

    if (task && task.status !== newStatus && activeBoardId) {
      dispatch(
        updateTask({
          boardId: activeBoardId,
          task: { ...task, status: newStatus },
        })
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <LoadingSpinner
            width={24}
            height={24}
            className="flex items-center place-content-center"
          />
        </div>
      ) : (
        <Tabs value={selectedTab} onValueChange={handleTabChange}>
          <div className="border-b overflow-x-auto md:overflow-visible">
            <div className="relative flex items-center w-full p-2 md:p-4">
              {/* Fixed NewBoard on the left in mobile only */}
              <div className="flex-shrink-0 z-10 bg-white dark:bg-background">
                <NewBoard />
              </div>

              {/* Scrollable TabsList next to NewBoard */}
              <div className="ml-2 overflow-x-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent flex-1 scrollbar-hidden">
                <TabsList className="flex w-max gap-2 border-0 bg-transparent p-0">
                  {boards.map((board) => (
                    <TabsTrigger
                      key={board.id}
                      value={board.id}
                      className={`p-2 whitespace-nowrap ${
                        selectedTab === board.id
                          ? ""
                          : "data-[state=active]:bg-secondary"
                      }`}
                      style={
                        selectedTab === board.id
                          ? {
                              backgroundColor: board.color.replace(
                                ")",
                                " / 20%)"
                              ),
                            }
                          : {}
                      }
                    >
                      {board.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>
          {boards.map((board) => (
            <TabsContent key={board.id} value={board.id}>
              <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 md:gap-2 p-2 md:p-4">
                <TasksColumns
                  title="To Do"
                  items={board.tasks.filter((item) => item.status === "To Do")}
                  Icon={IconPlayerPause}
                  board={board}
                />
                <TasksColumns
                  title="Doing"
                  items={board.tasks.filter((item) => item.status === "Doing")}
                  Icon={IconRun}
                  board={board}
                />
                <TasksColumns
                  title="Done"
                  items={board.tasks.filter((item) => item.status === "Done")}
                  Icon={IconCircleCheck}
                  board={board}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </DndContext>
  );
};

export default Tasks;
