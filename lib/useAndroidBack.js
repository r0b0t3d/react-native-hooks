"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
function useAndroidBack(callback, enable = true) {
    const savedCallback = react_1.useRef();
    react_1.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    react_1.useEffect(() => {
        if (!enable)
            return () => { };
        const subcriber = react_native_1.BackHandler.addEventListener('hardwareBackPress', () => {
            savedCallback.current();
            return true;
        });
        return () => {
            subcriber.remove();
        };
    }, [enable]);
}
exports.default = useAndroidBack;
//# sourceMappingURL=useAndroidBack.js.map