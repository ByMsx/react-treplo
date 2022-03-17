import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { CommentType } from '../../types';
import { CreateCommentPayload, RemoveCommentPayload, UpdateCommentPayload } from './action-types';

interface CommentsState {
  comments: CommentType[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment: (state, action: PayloadAction<CreateCommentPayload>) => {
      state.comments.push({
        ...action.payload,
        id: uuid(),
      });
    },

    updateComment: (state, action: PayloadAction<UpdateCommentPayload>) => {
      const { id } = action.payload;
      const comment = state.comments.find((c) => c.id === id);
      if (!comment) {
        throw new Error(`Comment with id=${id} not found`);
      }

      Object.assign(comment, action.payload);
    },
    removeComment: (state, action: PayloadAction<RemoveCommentPayload>) => {
      const id = action.payload;
      const commentIdx = state.comments.findIndex((comment) => comment.id === id);
      if (commentIdx < 0) {
        throw new Error(`Comment with id=${id} not found`);
      }

      state.comments.splice(commentIdx, 1);
    },
  },
});

export const { updateComment, removeComment, createComment } = commentsSlice.actions;

export default commentsSlice.reducer;
