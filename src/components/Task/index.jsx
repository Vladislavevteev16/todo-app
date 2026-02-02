import { memo, useRef, useState, useEffect, useCallback, useMemo } from "react";

import { useDispatch } from "../../hooks/useDispatch";

import { actions } from "../../actions";

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

export const Task = memo(({ id, value, date, isCompleted, currentList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const inputRef = useRef(null);

  const formattedDate = useMemo(() => dayjs(date).format("DD MMMM"), [date]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit]);

  const handleSaveEdit = useCallback(() => {
    const trimmedText = editValue.trim();

    if (trimmedText === "" || trimmedText === value) {
      setIsEdit(false);
      return;
    }

    dispatch(
      actions.createTaskValue(
        id,
        trimmedText[0].toUpperCase() + trimmedText.slice(1),
      ),
    );
    setIsEdit(false);
  }, [dispatch, editValue, id, value]);

  const handleKeyDown = useCallback(
    ({ key }) => {
      switch (key) {
        case "Enter":
          handleSaveEdit();
          break;
        case "Escape":
          setIsEdit(false);
          setEditValue(value);
          break;
      }
    },
    [handleSaveEdit, value],
  );

  const handleChangeIsCompleted = useCallback(
    ({ target: { checked } }) => {
      dispatch(actions.todoToggleCompleted(id, checked));
    },
    [dispatch, id],
  );

  const handleRemoveTask = useCallback(
    () => dispatch(actions.removeTask(id)),
    [dispatch, id],
  );

  return (
    <div
      className={`${style.taskContainer} ${isCompleted ? style.completed : ""}`}
    >
      <Checkbox
        checked={isCompleted}
        onClick={handleChangeIsCompleted}
        className={style.checkbox}
      />
      <div className={style.textContent}>
        {isEdit ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={({ target: { value } }) => setEditValue(value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className={style.timeContainer}>
        <ClockCircleOutlined />
        <p>{formattedDate}</p>
      </div>
      {currentList === "todosAll" ? (
        <div className={style.controlButtons}>
          {isEdit ? (
            <CheckOutlined className={style.saveEditIcon} />
          ) : (
            <EditOutlined
              className={style.createIcon}
              onClick={() => setIsEdit(true)}
            />
          )}

          <CloseSquareOutlined
            onClick={handleRemoveTask}
            className={style.deleteIcon}
          />
        </div>
      ) : null}
    </div>
  );
});
