import { FC, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Card, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import { getPlayer, postNewNotification, deleteNotification, putNotification } from "../../services/auth/PlayersServices"
import { Player, Notification } from "../../interfaces"
import { FaRegPlusSquare, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom"
import Alerts from "../shared/Alerts"

const PlayerComponent: FC = () => {
  const { id } = useParams<{id: string}>();
  const id_params = Number(id);
  const [player, setPlayer] = useState<Player>(Object)
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState('');
  const [idEdit, setIdEdit] = useState(0);


  //Close modal
  const handleClose = () => {
    setMessage('')
    setIdEdit(0)
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };

  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])

  const handleGetPlayer = async (id: number) => {
    try {
      const response = await getPlayer(id)
      setPlayer(response.data.player)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }

  const handleNewNotification = async (id: number) => {
    try {
      const response = await postNewNotification(id, message)
      
      if (response.status === 201) {
        setVariant('success')
        setMsgs(['Notification create success'])
        setOpemMsg(true)
        handleGetPlayer(id)

        setMessage('')
        handleClose()
      }
      else {
        setVariant('danger')
        setMsgs(['Error create notification'])
        setOpemMsg(true)
      }
    } catch (err) {
      setVariant('danger')
      setMsgs(['Error create notification'])
      setOpemMsg(true)
    }
  }

  const handleDeleteNotification = async (id: number) => {
    try {
      const response = await deleteNotification(id)
      
      if (response.status === 200) {
        handleGetPlayer(id_params)

        setVariant('success')
        setMsgs(['Notification removed'])
        setOpemMsg(true)
      }
      else {
        setVariant('danger')
        setMsgs(['Error remove notification'])
        setOpemMsg(true)
      }
    } catch (err) {
      setVariant('danger')
      setMsgs(['Error remove notification'])
      setOpemMsg(true)
    }
  }

  const handleEditNotification = async () => {
    try {
      const response = await putNotification(idEdit, message)
      if (response.status === 200) {
        setVariant('success')
        setMsgs(['Notification edit success'])
        setOpemMsg(true)
        handleGetPlayer(id_params)

        handleClose()
      }
      else {
        setVariant('danger')
        setMsgs(['Error edit notification'])
        setOpemMsg(true)
      }
    } catch (err) {
      setVariant('danger')
      setMsgs(['Error edit notification'])
      setOpemMsg(true)
    }
  }

  const editNotification = (id: number, msg: string) => {
    setIdEdit(id)
    setMessage(msg)
    handleShow()
  }

  useEffect(() => {
    handleGetPlayer(id_params)
  }, [id_params, setPlayer])


  const renderNotification = (notify: Notification, i: number) => {
    return (
      <Col xxl='12' className='mb-2' key={i}>
        <Card>
          <Card.Header>
            {moment(notify.created_at).format('YYYY-MM-DD')}

            <span style={{float: 'right'}}>
              <Button variant='danger' onClick={() => handleDeleteNotification(notify.id)}>
                <FaRegTrashAlt /> Remove
              </Button>
            </span>
            <span style={{float: 'right'}}>
              <Button variant='primary' onClick={() => editNotification(notify.id, notify.message)}>
                <FaPencilAlt /> Edit
              </Button>
            </span>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {notify.message}
              </p>
            </blockquote>
          </Card.Body>
        </Card>
      </Col>
    )
  }


  return(
    <Container>
      <Row>
        <Col xxl='10'>
          <h1>{player.name} - Number {player.number} - Position {player.position}</h1>
        </Col>

        <Alerts 
          variant={variant}
          open={opemMsg}
          msgs={msgs}
        />
        
        
        <Col xxl='4'>
          <b>Team:</b> {player.team}
        </Col>
        <Col xxl='4'>
          <b>Nationality:</b> {player.nationality}
        </Col>
        <Col xxl='2'>
          <b>Birth Date:</b> {player.birth_date}
        </Col>
        <Col xxl='2'>
          <b>Age:</b> {player.age}
        </Col>

        <Col xxl='10' className='mt-5'>
          <h1>Notifications</h1>
        </Col>
        <Col xxl='2' className='mt-5'>
          <Button variant='success' onClick={() => handleShow() }> <FaRegPlusSquare /> New Notification</Button>
        </Col>
        
        <>
        {
          player.notifications ? player.notifications.map((notify, i) => renderNotification(notify, i) ) : ''
        }
        </>
      </Row>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={event => setMessage(event.target.value)} onBlur={event => setMessage(event.target.value)} value={message}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => idEdit !== 0 ? handleEditNotification() : handleNewNotification(id_params)}>
              {
                idEdit !== 0 ? 'Save Changes' : 'Create'
              }
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
    
  )
}

export default PlayerComponent