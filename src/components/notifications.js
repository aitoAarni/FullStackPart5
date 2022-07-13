import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
    return (
        <>
            <p className='error'>
                {message}
            </p>
        </>
    )
}

const Notification = ({ message }) => {
    return (
        <>
            <p className='notification'>
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