import { createSlice } from '@reduxjs/toolkit';

interface Review {
    _id: string;
    title: string;
    description: string;
    city: string;
    rating: number;
    comment: string;
  
}
interface Project extends Review {
    categories: string;
    images: string[];
};


interface AuthState {
  user: any;
  token: any;
  serviceId: string | null;
  updateId:number;
  project: Project[];
  reviews: Review[];

}

const initialState: AuthState = {
  user: null,
  token: null,
  serviceId: null,
  updateId:0,
  project: [],
  reviews: [],
 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
   
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    removeToken: (state) => {
      state.token = null;
      state.user = null;
    },
    setUpdateId: (state, action) =>{
      state.updateId = action.payload.updateId;
    },
    setServiceId: (state, action) => {
      state.serviceId = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    setReviewList: (state, action) => {
      const updatesReviews = state.reviews.map((review) => {
        if (review._id === action.payload.review_id) return action.payload.review;
        return review;
      });
      state.reviews = updatesReviews;
    },
    setProject: (state, action) => {
      state.project = action.payload.project;
    },
    setProjectList: (state, action) => {
      const updatedProjects = state.project.map((project) => {
        if (project._id === action.payload.project_id) return action.payload.project;
        return project;
      });
      state.project = updatedProjects;
    },
    
  },
});

export const { setLogin, logout, removeToken , setProject, setReviewList, setReviews, setProjectList, setServiceId, setUpdateId } =
  authSlice.actions;

export default authSlice.reducer;