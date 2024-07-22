import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableData {
  amount: string;
  created_at: string;
  creator_id: number;
  id: number;
  personal_data_field_id: number;
  qunatity: number;
  status: string;
  updated_at: string;
}

interface TableState {
  tableData: TableData[];
}

const initialState: TableState = {
  tableData: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTableRow: (state, action: PayloadAction<TableData>) => {
      console.log('action.payload', action.payload)
      console.log('state.tableData', state.tableData)
      state.tableData.push(action.payload);
    },
    deleteTableRow: (state, action: PayloadAction<number>) => {
      state.tableData = state.tableData.filter((row) => row.id !== action.payload);
    },
    setTableData: (state, action: PayloadAction<TableData[]>) => {
      state.tableData = action.payload;
    },
  },
});

export const { addTableRow, deleteTableRow, setTableData } = tableSlice.actions;

export default tableSlice.reducer;
