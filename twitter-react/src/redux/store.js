import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {autoMergeLevel2} from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer as user, profileReducer as profile} from "./reducers";
import {createTweetReducer as createTweet} from "./reducers";
import {timelineReducer as timeline} from "./reducers";
import {deleteTweetReducer as deleteTweet} from "./reducers";
import {trendsReducer as trends} from "./reducers";
import {getTweetReducer as getTweet} from "./reducers";
import {getLikeRetTweetReducer as likeRetTweet} from "./reducers";
import {tweetActionsReducer as tweetAction} from "./reducers";
import {updateProfileReducer as updateProfile} from "./reducers";
import {updateUserReducer as updateUser} from "./reducers";
import {followReducer as follow} from "./reducers";
import {unfollowReducer as unfollow} from "./reducers";
import {followListReducer as followList} from "./reducers";
import {getTweetsReducer as getTweets} from "./reducers";
import {logsReducer as logs} from "./reducers";
import {searchReducer as search} from "./reducers";
import {notificationsReducer as notifications} from "./reducers";
import {suggestionReducer as suggestion} from "./reducers";
import thunk from "redux-thunk";


const reducers = combineReducers({
    user,
    createTweet,
    profile,
    timeline,
    getTweets,
    deleteTweet,
    getTweet,
    likeRetTweet,
    trends,
    tweetAction,
    updateProfile,
    updateUser,
    follow,
    unfollow,
    followList,
    logs,
    search,
    notifications,
    suggestion,
});

const persistConfig = {
    key: 'twitter',
    blacklist: [
        'createTweet',
        'profile',
        'timeline',
        'getTweets',
        'deleteTweet',
        'getTweet',
        'likeRetTweet',
        'tweetAction',
        'trends',
        'updateProfile',
        'updateUser',
        'follow',
        'unfollow',
        'followList',
        'logs',
        'search',
        'notifications',
        'suggestion',
    ],
    storage,
    stateReconciler : autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, reducers);

const devTool = composeWithDevTools(applyMiddleware(thunk));
export const getStore = () => createStore(persistedReducer, devTool);