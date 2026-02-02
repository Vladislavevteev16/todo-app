import { useContext } from "react";

import { DispatchContext } from "../context";

export const useDispatch = () => {
  const context = useContext(DispatchContext);

  if (!context)
    throw new Error("useDispatch must be used inside DispatchProvider");

  return context;
};
