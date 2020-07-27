function mapStateToProps(component) {
    function createAuthHeader(state){
        return {headers:{"Authorization": "Basic " + btoa(state.email + ':'+state.password)}};
    }
    switch (component) {

        case "HistoryQuiz": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "CreateQuiz": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "MenuQuiz": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state)
                };
            }
        }
        case "PagingQuiz": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state),
                    isLogin: state.email!==''
                };
            }
        }
        case "Quiz": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state),
                };
            }
        }
        case "AuthenticationWindow": {
            return function (state) {
                return {
                    authHeader: createAuthHeader(state),
                    isLogin: state.email!==''
                };
            }
        }
        case "App": {
            return function(state){
                return{
                    email: state.email
                }
            }
        }
        default: return undefined;
    }
}

export default mapStateToProps;