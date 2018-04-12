export default StoreInit = {
    "proto": ["Hello World", "Hugo"],
    "currentTest": "sentenceValidator",
    "tests": {
        "sentenceValidator": {
            "sessionStep": 0,
            "started": false,
            "playing": false,
            "recording": false,
            "voiceRecorded": false,
            "statusBar": "Play Audio File",
            "session": {
                "length": 0,
                "list": [],
            },
        },
    },
};

const sessionObject = {
    length: "number",
    list: [
        {
            step: "number",
            responseTime: "number in sec",
            patientRecord: "audio",
            name: "string",
            validation: "bool",
        },
    ],
};