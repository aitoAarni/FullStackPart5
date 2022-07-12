import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
    return (
        <>
            <p>
                {message}
            </p>
        </>
    )
}

const Notification = ({ message }) => {
    return (
        <>
            <p>
                {message}
            </p>
        </>
    )

}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
}

Notification.propTypes = {
    message: PropTypes.string.isRequired
}

export { ErrorMessage, Notification }