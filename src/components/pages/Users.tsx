import { FC, useEffect, useState } from 'react';
import { Table, Col, Container, Row, Pagination } from 'react-bootstrap';
import { getUsers } from "../../services/auth/UsersServices"
import { UserApi } from "../../interfaces"
import { FaArrowsAltV, FaArrowUp, FaArrowDown, FaExternalLinkAlt } from "react-icons/fa";
import { Link, generatePath } from "react-router-dom"


const Users: FC = () => {
  const [users, setUsers] = useState<UserApi[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)

  const [orderField, setOrderField] = useState<string>('name')
  const [orderBy, setOrderBy] = useState<string>('ASC')

  const handleGetUsers = async (page = 1, order_field = 'name', order_by = 'ASC') => {
    try {
      setOrderField(order_field)
      setOrderBy(order_by)
      const body = {
        page,
        order_field: order_field,
        order_by: order_by
      }
      setPage(page)

      const response = await getUsers(body)
      setUsers(response.data.users)
      setTotalPage(response.data.total_page)
    } catch (err) {
      // Error
      // console.log(err)
    }
  }

  useEffect(() => {

    handleGetUsers()

  }, [setUsers])
  return(
    <Container>
      <Row>
        <Col xxl='12'>
          <h1>Players</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{cursor: 'pointer'}} onClick={() => handleGetUsers(page, 'name', orderField !== 'name' ? 'ASC' : orderBy === 'ASC' ? 'DESC' : 'ASC')}>
                  Name
                  <span style={{float: 'right'}}>
                    { orderField !== 'name' ? <FaArrowsAltV /> : orderBy === 'ASC' ? <FaArrowUp /> : <FaArrowDown /> }
                  </span>
                </th>
                <th style={{cursor: 'pointer'}} onClick={() => handleGetUsers(page, 'email', orderField !== 'email' ? 'ASC' : orderBy === 'ASC' ? 'DESC' : 'ASC')}>
                  Email

                  <span style={{float: 'right'}}>
                    { orderField !== 'email' ? <FaArrowsAltV /> : orderBy === 'ASC' ? <FaArrowUp /> : <FaArrowDown /> }
                  </span>
                </th>
                <th>
                  Qt Subscriptions
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.subscriptions_count}</td>
                    <td>
                      <span className='d-inline-flex p-1'>
                        <Link to={generatePath("/users/:id", { id:p.id  })}>
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
        <Col xxl="5">
          <Pagination>
            <Pagination.First disabled={page === 1 ? true : false } onClick={ () => handleGetUsers(1, orderField, orderBy)} />
            <Pagination.Prev disabled={page === 1 ? true : false } onClick={ () => handleGetUsers(page - 1)}/>
              <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next disabled={page === totalPage ? true : false } onClick={ () => handleGetUsers(page +1, orderField, orderBy)}/>
            <Pagination.Last disabled={page === totalPage ? true : false } onClick={ () => handleGetUsers(totalPage, orderField, orderBy)}/>
          </Pagination>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Users