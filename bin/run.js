let SessionsProcess = require('../obj/src/container/SessionsProcess').SessionsProcess;

try {
    new SessionsProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
