import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initCalcValues = {
  result: '0',
  calcNumbers: [''] as string[],
  operation: '' as OperationType,
}

const initialState = {
  isInRuntime: false,
  elementsIDs: [] as string[],
  dragElementId: '',
  dragOverElementId: '',
  isConstructorArea: false,
  isDraging: false,
  calcValues: initCalcValues,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInRuntime(state, action: PayloadAction<boolean>) {
      state.isInRuntime = action.payload
    },
    setConstructorElements(state, action: PayloadAction<string[]>) {
      let arrayIDs = action.payload

      if (action.payload.includes('1') && action.payload[0] !== '1') {
        const array = action.payload.filter(el => el !== '1')

        array.unshift('1')
        arrayIDs = array
      }
      state.elementsIDs = arrayIDs
    },
    setDragElementId(state, action: PayloadAction<string>) {
      state.dragElementId = action.payload
    },
    setDragOverElementId(state, action: PayloadAction<string>) {
      state.dragOverElementId = action.payload
    },
    setIsConstructorArea(state, action: PayloadAction<boolean>) {
      state.isConstructorArea = action.payload
    },
    setIsDraging(state, action: PayloadAction<boolean>) {
      state.isDraging = action.payload
    },
    setResult(state, action: PayloadAction<string>) {
      state.calcValues.result = action.payload
    },
    setOperation(state, action: PayloadAction<OperationType>) {
      state.calcValues.operation = action.payload
    },
    setCalculations(state, action: PayloadAction<string[]>) {
      state.calcValues.calcNumbers = action.payload
    },
    setResetCalcValues(state) {
      state.calcValues = initCalcValues
    },
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const {
  setIsInRuntime,
  setConstructorElements,
  setDragElementId,
  setDragOverElementId,
  setIsConstructorArea,
  setIsDraging,
  setResult,
  setOperation,
  setResetCalcValues,
  setCalculations,
} = appSlice.actions

// TYPES
export type OperationType = '/' | 'x' | '-' | '+' | ''
