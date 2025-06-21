import { configureStore } from "@reduxjs/toolkit"
import toolSliceReducer from "@/store/toolSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      tool: toolSliceReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
