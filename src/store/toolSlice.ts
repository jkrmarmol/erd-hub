import { ToolSliceInitialState } from "@/types/redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ToolSliceInitialState = {
  selectedTool: "SELECT",
}

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    setSelectedTool: (
      state,
      action: PayloadAction<ToolSliceInitialState["selectedTool"]>
    ) => {
      state.selectedTool = action.payload
    },
    resetSelectedTool: (state) => {
      state.selectedTool = "SELECT"
    },
  },
  extraReducers: () => {},
})

export const { setSelectedTool, resetSelectedTool } = toolSlice.actions
export default toolSlice.reducer
