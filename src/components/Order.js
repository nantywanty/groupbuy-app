import { Card, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap';

export default function Order() {
    return (
        <div className="p-5" style={{
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20200113/pngtree-chinese-new-year-2020-celebration-sale-template-for-background-and-wallpaper-image_327185.jpg")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '700px',
            backgroundColor: '#dc3545',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Card style={{ width: '40rem' }}>
                <Card.Header as="h5">New Order</Card.Header>
                <Card.Img className="px-2 pt-2"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNFJtaMn_Y5zPbpVWA0ojPrD_WqKhvGgnfw&usqp=CAU"/>
                <Card.Body>
                    <Card.Title>Item Name</Card.Title>
                    <Card.Text>Item Description</Card.Text>
                    <Form>
                        <Row className="mb-3">
                            <Col>  
                                <FloatingLabel controlId="formQuantity" label="Quantity">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                Max available: 4
                            </Col>
                        </Row>
                        <FloatingLabel className="mb-3" controlId="formAddress" label="Delivery address">
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="floatingPassword" label="Contact Number">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card> 
        </div>
    );
}