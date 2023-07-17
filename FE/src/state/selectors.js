import { createSelector } from '@reduxjs/toolkit';

const userSelector = (state) => state.user;

export const getUserData = createSelector(
    userSelector,
    (user) => user.address
);

export const getInfor = createSelector(
    userSelector,
    (user) => user.infor
)