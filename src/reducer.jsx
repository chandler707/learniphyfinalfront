
const AddItems = (state = [{}], action) => {
    switch (action.type) {

        // This reducer handles any action with type "LOGIN"
        case "add-items":
            return state.map(user => {
                if (user.username !== action.username) {
                    return user;
                }

                if (user.password == action.password) {
                    return {
                        ...user,
                        login_status: "LOGGED IN"
                    }
                }
            });
        default:
            return state;
    }
};