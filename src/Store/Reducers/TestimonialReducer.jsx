import { ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constants"
export default function TestimonialReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case GET_TESTIMONIAL_RED:
            return action.payload
        case ADD_TESTIMONIAL_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState
        case UPDATE_TESTIMONIAL_RED:
            index = state.findIndex((x) => x.id === Number(action.payload.id))
            state[index].name = action.payload.name
            state[index].message = action.payload.message
            state[index].pic = action.payload.pic
            state[index].star = action.payload.star
            state[index].profession = action.payload.profession
            return state
        case DELETE_TESTIMONIAL_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state
    }
}