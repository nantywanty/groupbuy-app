import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { NavDropdown } from 'react-bootstrap';

export default function Login(props) {

    return (
        <div>
            { props.user ? (
                // User logged in
                <NavDropdown title = {
                    <div className="d-flex gap-2">
                        <img src={props.user.picture} className="rounded-circle" height={30} alt="user"></img>
                        {props.user.name}
                    </div>
                }>
                    <NavDropdown.Item onClick={() => props.setUser(null)}>Sign out</NavDropdown.Item>
                </NavDropdown>
                
            ) : (
                // User not logged in
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        if (credentialResponse.credential != null) {
                            const new_user = jwtDecode(credentialResponse.credential);
                            props.setUser(new_user);
                            
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}
        </div>
    );
}

// Decoded Google credentialResponse
// aud: string,
// azp: string,
// email: string,
// email_verified: boolean,
// exp: number,
// family_name: string,
// given_name: string,
// iss: string,
// jti: string,
// name: string,
// nbf: number,
// picture: string,
// sub: string