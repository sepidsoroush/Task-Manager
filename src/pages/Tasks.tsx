import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconPlayerPause, IconRun, IconCircleCheck } from "@tabler/icons-react";

import TasksColumns from "@/components/tasks/TasksCols";
import NewTask from "@/components/tasks/NewTask";
import NewBoard from "@/components/boards/NewBoard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchBoardsWithTasks,
  updateActiveBoard,
} from "@/store/boards-actions";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.loading);
  const boards = useAppSelector((state) => state.boards.items);
  const activeBoardId = useAppSelector((state) => state.boards.activeBoardId);
  const [selectedTab, setSelectedTab] = useState<string>(activeBoardId);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    dispatch(updateActiveBoard(value));
  };

  useEffect(() => {
    dispatch(fetchBoardsWithTasks());
  }, [dispatch]);

  useEffect(() => {
    setSelectedTab(activeBoardId);
  }, [activeBoardId]);

  return (
    <>
      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <LoadingSpinner
            width={96}
            height={96}
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
    </>
  );
};

export default Tasks;
