import { Task } from "components/Task/Task";
import { useSelector, useDispatch } from "react-redux";
import { statusFilters } from "redux/constants";
import css from "./TaskList.module.css";
import { getTasks } from "redux/selectors";
import { useEffect } from "react";
import { fetchTasks } from "redux/operations";

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(task => !task.completed);
    case statusFilters.completed:
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  const tasks = useSelector(state => state.tasks.items);
  const statusFilter = useSelector(state => state.filters.status);
  const visibleTasks = getVisibleTasks(tasks, statusFilter);
  const { items, isLoading, error } = useSelector(getTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {items.length > 0 && (
        <ul className={css.list}>
          {visibleTasks.map(task => (
            <li className={css.listItem} key={task.id}>
              <Task task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
