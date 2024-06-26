import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { closeModal } from "../modalDelivery/modalDeliverySlice";
import { clearOrder } from "../order/orderSlice";


const initialState = {
    name: '',
    phone: '',
    format: 'delivery',
    address: '',
    floor: '',
    intercom: '',
}

export const submitForm = createAsyncThunk(
    'form/submit',
    async (data, {dispatch, rejectedWithValue}) => {
        try {
            const response = await fetch('https://cloudy-slash-rubidium.glitch.me/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status.text}`);
            }

            dispatch(clearOrder());
            dispatch(closeModal());

            return await response.json();
        } catch (e) {
            return rejectedWithValue(e.message);
        }
    }
)

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormValue: (state, action) => {
            state[action.payload.field] = action.payload.value;
        }
    },
    extraReducers: (buider) => {
        buider
        .addCase(submitForm.pending, (state) => {
            state.status = 'loading';
            state.response = null;
            state.error = null;
        })
        .addCase(submitForm.fulfilled, (state, action) => {
            state.status = 'success';
            state.response = action.payload;
        })
        .addCase(submitForm.rejected, (state, action) => {
            state.status = 'fail';
            state.error = action.payload;
        })
    }
})

export const { updateFormValue } = formSlice.actions;
export default formSlice.reducer;