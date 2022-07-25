import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    clickedName: null,
    clickedId: null,
    chatData: {
        messages: []
    },
    commonChatId: null
}

export const initiateChat = createAsyncThunk(
    '/api/createChat',
    async (data) => {
        const res = axios.post('http://localhost:5000/api/createChat',data);
        return res
    }
)

export const searchChat = createAsyncThunk(
    '/api/searchChat',
    async ({chatId}) => {
        const res = await axios.post('http://localhost:5000/api/searchChat',{chatId});
        return res
    }
)

export const startChatSlice = createSlice({
    name: "startChat",
    initialState,
    reducers: {
        startChat: (state, action) => {
            state.clickedName = action.payload.userName
            state.clickedId = action.payload.userId
            
        },
        updateCommonChatId: (state, action) => {
            state.commonChatId = action.payload
        },
        clearChat: (state) => {
            state.chatData = {
                messages: []
            }
        }
        
    },
    extraReducers: {
        [initiateChat.fulfilled]: (state, action) => {
            state.chatData = action.payload.data.chatData
            state.commonChatId = action.payload.data.chatData._id
        },
        [searchChat.fulfilled]: (state, action) => {
            state.chatData.messages = action.payload.data.messages
        }
    }
})

export const {startChat, updateCommonChatId, clearChat} = startChatSlice.actions; 

export default startChatSlice.reducer;

