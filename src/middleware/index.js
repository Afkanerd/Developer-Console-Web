import { applyMiddleware } from "redux";
import logger from "./logger";
import thunk from "redux-thunk";

const rootMiddleware = applyMiddleware(
    thunk,
    logger
)

export default rootMiddleware;