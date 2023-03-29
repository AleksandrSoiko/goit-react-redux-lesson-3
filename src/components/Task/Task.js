import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../../redux/taskSlice";

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(toggleCompleted(task.id));
  const handleDelete = () => dispatch(deleteTask(task.id));
  return (
    <div className={css.wrapper}>
      <input
        onChange={handleToggle}
        type="checkbox"
        className={css.checkbox}
        checked={task.completed}
      />
      <p className={css.text}>{task.text}</p>
      <button onClick={handleDelete} className={css.btn}>
        <MdClose size={24} />
      </button>
    </div>
  );
};
