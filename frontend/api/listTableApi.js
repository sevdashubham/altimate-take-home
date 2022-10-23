import {useCallback, useState} from "react";
import axios from "axios";

const unknownErrorPayload = {
    confirmText: "Ok",
    message: "Something went wrong",
    title: "Oops!",
};

export function useSchemaListFetch(props) {
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

    const handleFetchSchemaList = useCallback(async () => {
        if (isSubmitting) {
            return;
        }
        try {
            setSubmitting(true);
            const response = await axios.get(
                `http://localhost:8000/tables/list/all`
            );
            if (response.status === 200) {
                await finishWithSuccess(response);
            } else {
                finishWithError(unknownErrorPayload);
            }
        } catch (e) {
            finishWithError(e);
        }
    }, [isSubmitting]);

    return {
        isFetching: isSubmitting,
        schemaList: handleFetchSchemaList,
    };
}
