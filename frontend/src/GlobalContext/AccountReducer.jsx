export const AccountReducer = (account_state, action) => {
    switch (action.type) {
        case "LOGIN":

            return { ...account_state, token: action.token, people: 'user' };

        case "LOGOUT":
            return { ...account_state, token: null, people:'guest' }

        default:
            return account_state;
    }
}