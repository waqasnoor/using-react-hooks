import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

export const FETCH_INIT = "FETCH_INIT";
export const FETCH_FAILED = "FETCH_FAILED";
export const REPLACE_DATA = "REPLACE_DATA";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: false };
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case FETCH_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Data Retrieve Failed",
      };
    case REPLACE_DATA:
      const newData = state.data.map((record) => {
        return record.id === action.record.id ? action.record : record;
      });
      return {
        ...state,
        data: newData,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };
  }
};

const useAxiosFetch = (initialUrl, initialData) => {
  const [url] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    errorMessage: "",
    data: initialData,
  });
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });
      try {
        const result = await axios.get(url);
        if (!didCancel) {
          dispatch({ type: FETCH_SUCCESS, payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_FAILED });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  const updateDataRecord = (record) => {
    dispatch({ type: REPLACE_DATA, record });
  };
  return { ...state, updateDataRecord };
};
export default useAxiosFetch;
