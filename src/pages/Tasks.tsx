import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import TasksColumns from "../components/tasks/TasksCols";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBoardsWithTasks,
  updateActiveBoard,
} from "@/store/boards-actions";

import { IconPlayerPause, IconRun, IconCircleCheck } from "@tabler/icons-react";
import NewBoard from "@/components/boards/NewBoard";

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<string>("");

  const boards = useAppSelector((state) => state.boards.items);
  const activeBoardId = useAppSelector((state) => state.boards.activeBoardId);
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);

  useEffect(() => {
    dispatch(fetchBoardsWithTasks());
  }, [dispatch]);

  useEffect(() => {
    setSelectedTab(activeBoardId);
  }, [activeBoardId]);

  const handleTabChange = (value: string) => {
    if (value === "new") {
      setSelectedTab(activeBoardId);
      return;
    }
    setSelectedTab(value);
    dispatch(updateActiveBoard(value));
  };

  const activeBoard = boards.find((b) => b.id === activeBoardId);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex items-center place-content-center">
          <LoadingSpinner
            width={96}
            height={96}
            className="flex items-center place-content-center"
          />
        </div>
      ) : (
        <Tabs value={selectedTab} onValueChange={handleTabChange}>
          <TabsList>
            {boards.map((board) => (
              <TabsTrigger key={board.id} value={board.id}>
                {board.title}
              </TabsTrigger>
            ))}
            <TabsTrigger key="new" value="new" className="w-12">
              <NewBoard />
            </TabsTrigger>
          </TabsList>
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
