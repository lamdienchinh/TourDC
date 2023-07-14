import { createSelector } from '@reduxjs/toolkit';

const userSelector = (state) => state.user;

export const getUserData = createSelector(
    userSelector,
    (user) => user.address
);