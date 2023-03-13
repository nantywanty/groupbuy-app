import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <Container fluid style={{
            backgroundImage: `url(https://www.jll.com.sg/images/apac/supermarkets-and-retail-food-stores-social-1200x628.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <h1 className="display-1 text-light">Welcome to Grouper!</h1>
            <h2 className="text-light">Sign in to coordinate or join a group purchase!</h2>
        </Container>
    );
} 