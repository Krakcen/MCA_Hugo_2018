export const setTest = (idTest, data) => {
    return {
        type: 'SET_TEST',
        payload: data,
        idTest: idTest,
    };
};

export const setCurrentTest = (testType) => {
    return {
        type: 'SET_CURRENT_TEST',
        payload: testType,
    };
};