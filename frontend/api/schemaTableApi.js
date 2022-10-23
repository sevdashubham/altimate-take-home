import {useCallback, useState} from "react";
import axios from "axios";

const unknownErrorPayload = {
    confirmText: "Ok",
    message: "Something went wrong",
    title: "Oops!",
};

export function useSchemaTableDataFetch(props) {
    const {onSuccess, onError} = props;
    const [isSubmitting, setSubmitting] = useState(false);

    const finishWithError = useCallback((error) => {
        setSubmitting(false);
        onError?.(error);
    }, []);

    const finishWithSuccess = useCallback(async (payload) => {
        setSubmitting(false);
        onSuccess?.(payload);
    }, []);

    const handleFetchSchemaData = useCallback(
        async (payload) => {
            if (isSubmitting) {
                return;
            }
            try {
                setSubmitting(true);
                const response = await axios.get(
                    `http://localhost:8000/tables/get/${payload.tableName}`
                );
                if (response.status === 200) {
                    await finishWithSuccess(response);
                } else {
                    finishWithError(unknownErrorPayload);
                }
            } catch (e) {
                finishWithError(e);
            }
        },
        [isSubmitting]
    );

    return {
        isFetching: isSubmitting,
        schemaData: handleFetchSchemaData,
    };
}
