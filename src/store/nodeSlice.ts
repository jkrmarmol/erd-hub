import { NodeSliceInitialState } from "@/types/redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: NodeSliceInitialState = {
  selectedNode: "",
}

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    setSelectedNode: (
      state,
      action: PayloadAction<NodeSliceInitialState["selectedNode"]>
    ) => {
      state.selectedNode = action.payload
    },
    cleanUpSelectedNode: (state) => {
      state.selectedNode = ""
    },
  },
  extraReducers: () => {},
})

export const { setSelectedNode, cleanUpSelectedNode } = nodeSlice.actions
export default nodeSlice.reducer
