import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/rootReducer";
import { AppDispatch } from "../store/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
