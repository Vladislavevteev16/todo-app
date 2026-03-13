import { memo, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeTask,
  taskToggleCompleted,
  updateTaskTitle,
} from "../../redux/slices/todosSlice.js";

import { Loader } from "../../shared/Loader";

import { FILTER_TYPES, KEY_CODES } from "../../constants";

import { Checkbox } from "antd";
import {
  ClockCircleOutlined,
  EditOutlined,
  CloseSquareOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(relativeTime);
dayjs.locale("ru");

import style from "./index.module.css";

export const Task = memo(
  ({ id, title, createdAdd, isCompleted, currentList }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState(title);

    const dispatch = useDispatch();

    const {
      isRemoveTaskLoading,
      isTaskToggleLoading,
      isTaskChangeValueLoading,
    } = useSelector((state) => state.todos.loadingStates);

    const inputRef = useRef(null);

    const formattedDate = useMemo(
      () => dayjs(createdAdd).format("DD MMMM"),
      [createdAdd],
    );

    useEffect(() => {
      if (isEdit && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEdit]);

    const handleSaveEdit = useCallback(async () => {
      try {
        const trimmedText = editValue.trim();

        if (trimmedText === "" || trimmedText === title) {
          setIsEdit(false);
          return;
        }
        await dispatch(
          updateTaskTitle({
            id,
            text: trimmedText[0].toUpperCase() + trimmedText.slice(1),
          }),
        ).unwrap();

        setIsEdit(false);
      } catch (e) {
        console.error(e);
      }
    }, [dispatch, editValue, id, title]);

    const handleKeyDown = async ({ key }) => {
      switch (key) {
        case KEY_CODES.ENTER:
          await handleSaveEdit();
          break;
        case KEY_CODES.ESCAPE:
          setIsEdit(false);
          setEditValue(title);
          break;
      }
    };

    const handleChangeIsCompleted = () => dispatch(taskToggleCompleted(id));

    const handleRemoveTask = () => dispatch(removeTask(id));

    const handleStartIsEditValue = () => setIsEdit(true);

    const handleChangeEditValue = ({ target: { value } }) =>
      setEditValue(value);

    return (
      <div
        className={`${style.taskContainer} ${isCompleted ? style.completed : ""}`}
      >
        <div className={style.checkboxWrapper}>
          {isTaskToggleLoading ? (
            <Loader size={{ width: 23, height: 23 }} />
          ) : (
            <Checkbox
              checked={isCompleted}
              onClick={handleChangeIsCompleted}
              className={style.checkbox}
            />
          )}
        </div>

        <div className={style.textContent}>
          {isEdit ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={handleChangeEditValue}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveEdit}
            />
          ) : (
            <span>{title}</span>
          )}
        </div>
        <div className={style.timeContainer}>
          <ClockCircleOutlined />
          <p>{formattedDate}</p>
        </div>
        {currentList === FILTER_TYPES.ALL ? (
          <div className={style.controlButtons}>
            {isEdit ? (
              <CheckOutlined className={style.saveEditIcon} />
            ) : (
              <div className={style.createIconWrapper}>
                {isTaskChangeValueLoading ? (
                  <Loader size={{ width: 23, height: 23 }} />
                ) : (
                  <EditOutlined
                    className={style.createIcon}
                    onClick={handleStartIsEditValue}
                  />
                )}
              </div>
            )}

            <div className={style.deleteIconWrapper}>
              {isRemoveTaskLoading ? (
                <Loader size={{ width: 23, height: 23 }} />
              ) : (
                <CloseSquareOutlined
                  onClick={handleRemoveTask}
                  className={style.deleteIcon}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);
