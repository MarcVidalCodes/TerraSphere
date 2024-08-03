import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    favourites: [],
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setFavourites: (state, action) => {
            state.favourites = action.payload;
        },
        addFavouriteLocation: (state, action) => {
            state.favourites.push(action.payload);
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation, setFavourites, addFavouriteLocation } = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectFavourites = (state) => state.nav.favourites;

export default navSlice.reducer;
