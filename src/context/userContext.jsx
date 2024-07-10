import {signIn} from '../../../madeWithLoveBackEnd/routes/user/controller/userController'

//ACTION CREATOR
export const logInActionCreator = ({email, password}) =>{
    async (dispatch, getState) => {
        try{
            const user = await signIn(email, password)
            dispatch({type: "LOG_IN", payload: {user: user}})
        }catch(error){
            console.log(error)
        }
    }
}

export const userReducer = (oldState, action)=>{
    switch(action.type){
        case "LOG_IN":{
            return {...oldState, user: action.payload.user}
        }
        case "LOG_OUT": {
            return {...oldState, user: null}
        }
        case "ADD_TO_FAVORITES": {
            const {itemID}=action.payload
            return {...oldState, user: {...oldState.user, favorites:[...this.favorites, itemID]}}
        }
        case "REMOVE_FROM_FAVORITES":{
            const {itemID}=action.payload
            return {...oldState, user: {
                  ...state.user,
                  favorites: state.user.favorites.filter(item => item.id !== itemID),
                },
            }
        }
        default: return oldState
    }
}