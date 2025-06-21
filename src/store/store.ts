import { configureStore } from "@reduxjs/toolkit"
import toolSliceReducer from "@/store/toolSlice"
import nodeSliceReducer from "@/store/nodeSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      tool: toolSliceReducer,
      node: nodeSliceReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
