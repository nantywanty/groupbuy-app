import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <div>
            <Container className="p-3" fluid style ={{
                backgroundColor: "#f8f9fa",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <img src="logo.png" width="100" alt="grouper-logo"/>
                <p>Web application developed by Darius, Dennis, Liu Yue and Nant for CS5224.</p>
            </Container>
        </div>
    );
}