import { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { getUser } from "../../services/auth/UsersServices"
import { UserApi } from "../../interfaces"
import { generatePath, Link, useParams } from "react-router-dom"
import { FaExternalLinkAlt } from 'react-icons/fa';

const UserComponent: FC = () => {
  const { id } = useParams<{id: string}>();
  const id_params = Number(id);
  const [user, setUser] = useState<UserApi>(Object)

  const handleGetUser = async (id: number) => {
    try {
      const response = await getUser(id)
      console.log(response)
      setUser(response.data.user)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }

  useEffect(() => {
    handleGetUser(id_params)
  }, [id_params, setUser])

  return(
    <Container>
      <Row>
        <Col xxl='12'>
          <h1>{user.name} - {user.email}</h1>
        </Col>        
        <Col className='mt-4'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Nationality
                </th>
                <th>
                  Position
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                user.subscriptions?.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.nationality}</td>
                    <td>{p.position}</td>
                    <td>
                      <span className='d-inline-flex p-1'>
                        <Link to={generatePath("/players/:id", { id:p.id  })}>
                          <FaExternalLinkAlt />
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    
  )
}

export default UserComponent