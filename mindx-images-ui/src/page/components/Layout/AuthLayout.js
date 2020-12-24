import './auth.layout.css'

function AuthLayout(props) {
    return (
        <div className="AuthLayout">
            { props.children }
        </div>
    )
}

export default AuthLayout;