import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
    const { data } = await axios.get("/posts");
    return data;
});

export const fetchTags = createAsyncThunk("post/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data;
});

export const fetchRemovePost = createAsyncThunk("post/fetchRemovePost", async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    },
};

const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //   Handle posts fetching
          .addCase(fetchPosts.pending, (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
          })
          .addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
          })
          .addCase(fetchPosts.rejected, (state) => {
            state.posts.items = [];
            state.posts.status = "error";
          })
        //   Handle tags fetching
          .addCase(fetchTags.pending, (state) => {
            state.tags.items = [];
            state.tags.status = "loading";
          })
          .addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
          })
          .addCase(fetchTags.rejected, (state) => {
            state.tags.items = [];
            state.tags.status = "error";
          })

        //   Handle remove post
          .addCase(fetchRemovePost.pending, (state, action) => {
            state.posts.items =  state.posts.items.filter(
              (obj) => obj._id !== action.meta.arg
            )
          })
      },
});

export const postsReducer = postsSlice.reducer;