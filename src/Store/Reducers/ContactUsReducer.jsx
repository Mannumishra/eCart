import { ADD_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_CONTACT_US_RED, UPDATE_CONTACT_US_RED } from "../Constants"
export default function ContactUsReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case GET_CONTACT_US_RED:
            return action.payload
        case ADD_CONTACT_US_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState
        case UPDATE_CONTACT_US_RED:
            index = state.findIndex((x) => x.id === Number(action.payload.id))
            state[index].name = action.payload.name
            return state
        case DELETE_CONTACT_US_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state
    }
}