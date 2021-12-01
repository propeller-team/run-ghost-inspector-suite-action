const core = require("@actions/core");
const axios = require("axios");

(async function () {
    // get inputs
    const GHOST_INSPECTOR_API_KEY = core.getInput("GHOST_INSPECTOR_API_KEY");
    const suiteID = core.getInput("suiteID");
    const vercelPreviewURL = core.getInput("vercelPreviewURL");

    // validate input
    const requiredFieldNames = [
        "suiteID",
        "GHOST_INSPECTOR_API_KEY",
        "vercelPreviewURL",
    ];
    requiredFieldNames.forEach((fieldName) => {
        if (!core.getInput(fieldName)) {
            core.setFailed(`required field "${fieldName}" is missing`);
        }
    });

    try {
        // make API request, get results
        const requestConfig = {
            timeout: parseInt(core.getInput("maxTimeout") || 300000),
        }; //default timeout of 5min
        const startURLQueryParam = `&base-url=${vercelPreviewURL}`;
        const response = await axios.get(
            `https://api.ghostinspector.com/v1/suites/${suiteID}/execute/?apiKey=${GHOST_INSPECTOR_API_KEY}${startURLQueryParam}`,
            requestConfig
        );
        const suiteResults = response.data.data;

        // set output variables
        core.info(suiteResults);
        core.setOutput(
            "resultURLs",
            suiteResults
                .map(
                    (suite) =>
                        `https://app.ghostinspector.com/suite-results/${suite.suiteResult}`
                )
                .join("\n")
        );
        core.setOutput(
            "passed",
            suiteResults.every((suite) => {
                return suite.passing; // && test.screenshotComparePassing
            })
        );
    } catch (error) {
        core.setFailed(error.message);
    }
})();
