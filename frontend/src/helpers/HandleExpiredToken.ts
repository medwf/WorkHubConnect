"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../state'
import { RootState } from '../Redux/store';

export const RemoveTokenFromStore = () => {
  const dispatch = useDispatch();
    // const token = useSelector((state : RootState) => state.token) // this just if the token doesn't exist in cookies
  dispatch(removeToken());
}