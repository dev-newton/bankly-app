const Error = (
    { message = 'Something went wrong', reason, onHandleError, handleErrorLabel }: { message?: string, reason: string, onHandleError: () => void, handleErrorLabel: string }) => {
    return (
        <div role="alert" className="error">
            Error Message: {message}<br />
            Reason: {reason}. <br />
            <br />
            <button className="retry-button" onClick={onHandleError}>{handleErrorLabel}</button>
        </div>
    )
}

export default Error