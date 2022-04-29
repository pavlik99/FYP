import {
  FETCH_ALL_RECIPES_START,
  FETCH_ALL_RECIPES_ERROR,
  FETCH_ALL_RECIPES_SUCCESS,
  FETCH_RECIPE_START,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_ERROR,
  LIKE_RECIPE_ERROR,
  LIKE_RECIPE_RESTART,
  LIKE_RECIPE_START,
  LIKE_RECIPE_SUCCESS,
  CREATE_RECIPE,
  CREATE_RECIPE_ERROR,
  CREATE_RECIPE_RESTART,
  CREATE_RECIPE_START,
  UPDATE_RECIPE,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE_RESTART,
  UPDATE_RECIPE_START,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR,
  DELETE_RECIPE_START,
  GET_USER_RECIPES,
  GET_USER_RECIPES_CLEAR,
  GET_USER_RECIPES_ERROR,
  GET_USER_RECIPES_START,
} from '../constants/recipeTypes'

const originalState = {
  recipes: [],
  loading: false,
}

// GET ALL RECIPES
export const recipesReducer = (state = originalState, action) => {
  switch (action.type) {
    // case FETCH_ALL_RECIPES_START:
    //   return {
    //     recipes: [],
    //     loading: true,
    //     success: false,
    //   }

    case FETCH_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        success: true,
      }

    case FETCH_ALL_RECIPES_ERROR:
      return { ...state, loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

const initialState = {
  recipe: {},
  loading: false,
}
//  FETCH ONE SPECIFIC RECIPE
export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_RECIPE_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     success: false,
    //   }

    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.payload,
        loading: false,
        success: true,
      }

    case FETCH_RECIPE_ERROR:
      return { ...state, loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

// GET ALL USER RECIPES
export const getUserRecipesReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    // case GET_USER_RECIPES_START:
    //   return {
    //     loading: true,
    //     success: false,
    //   }
    case GET_USER_RECIPES:
      return {
        loading: false,
        recipes: action.payload,
        success: true,
      }
    case GET_USER_RECIPES_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    case GET_USER_RECIPES_CLEAR:
      return {
        recipes: [],
      }
    default:
      return state
  }
}

// LIKE A RECIPE
export const likeRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    // case LIKE_RECIPE_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     liked: false,
    //   }

    case LIKE_RECIPE_SUCCESS:
      return {
        loading: false,
        liked: true,
      }

    case LIKE_RECIPE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        liked: false,
      }

    case LIKE_RECIPE_RESTART:
      return {}

    default:
      return state
  }
}

// CREATE A NEW RECIPE
export const newRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    // case CREATE_RECIPE_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     created: false,
    //   }

    case CREATE_RECIPE:
      return {
        loading: false,
        created: true,
        recipe: action.payload,
      }

    case CREATE_RECIPE_RESTART:
      return {}

    case CREATE_RECIPE_ERROR:
      return { ...state, loading: false, error: action.payload, created: false }

    default:
      return state
  }
}

// UPDATE A RECIPE
const updateInitialState = { recipe: {} }
export const updateRecipeReducer = (state = updateInitialState, action) => {
  switch (action.type) {
    // case UPDATE_RECIPE_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     updated: false,
    //   }

    case UPDATE_RECIPE:
      return {
        loading: false,
        updated: true,
        recipe: action.payload,
      }

    case UPDATE_RECIPE_RESTART:
      return { recipe: {} }

    case UPDATE_RECIPE_ERROR:
      return { ...state, loading: false, error: action.payload, updated: false }

    default:
      return state
  }
}

// DELETE A RECIPE
export const deleteRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    // case DELETE_RECIPE_START:
    //   return {
    //     ...state,
    //     loading: true,
    //     deleted: false,
    //   }

    case DELETE_RECIPE:
      return {
        loading: false,
        deleted: true,
      }

    case DELETE_RECIPE_ERROR:
      return { ...state, loading: false, error: action.payload, deleted: false }

    default:
      return state
  }
}
