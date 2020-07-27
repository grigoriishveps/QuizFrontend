import { bindActionCreators } from 'redux';
import * as actionCreator from './actionCreator';

function mapDispatchToProps(component) {
    switch (component) {
        case "HistoryQuiz": return function (dispatch) {
            return {};
        };
        case "CreateQuiz": return function (dispatch) {
            return {};
        };

        case "MenuQuiz":return function (dispatch){
            return {};
        }
        case "PagingQuiz":return function (dispatch){
            return {};
        }
        case "AuthenticationWindow":return function (dispatch){
            return {
                actionLogin: bindActionCreators(actionCreator.actionLogin, dispatch)
            };
        }
        case "App": return function (dispatch) {
            return {};
        }
        default: return undefined;
    }
}

export default mapDispatchToProps;