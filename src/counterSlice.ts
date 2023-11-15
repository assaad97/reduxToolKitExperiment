import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import {SerializedError} from "@reduxjs/toolkit/src/createAsyncThunk";

const initialState = {
    value: 0,
}

const commonProperties: Array<keyof SerializedError> = [
    'name',
    'message',
    'stack',
    'code',
]

const fetchUserById = createAsyncThunk(
    'fetchUserById',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`API_URL/api/v1/user/${userId}`)
            return response.data.data
        } catch (error: unknown) {
            return rejectWithValue({ name: "testName", message: 'testMessage' })
        }
    }, {
        serializeError: (value: any): SerializedError => {
            console.log('1 : ', value)
            if (typeof value === 'object' && value !== null) {
                console.log('2 : ', value)
                const simpleError: SerializedError = {}
                for (const property of commonProperties) {
                    if (typeof value[property] === 'string') {
                        simpleError[property] = value[property]
                    }
                }

                return simpleError
            }

            return { message: String(value) }
        }
    }
)

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
    },
    extraReducers: (builder) =>  {
        builder
            .addCase(fetchUserById.pending, (state, action) => {
                console.log('from builder 2', action)
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                console.log('from builder 3', action)
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                console.log('from builder 4', action)
            })
            .addDefaultCase((state, action) => {console.log('default : ', action)})
    }
})

// Action creators are generated for each case reducer function
export const actions = { ...counterSlice.actions, fetchUserById }


export default counterSlice.reducer
