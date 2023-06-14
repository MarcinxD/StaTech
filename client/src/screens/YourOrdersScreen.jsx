import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tbody,
  Tr,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  AlertTitle,
  Wrap,
  Table,
  Td,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const YourOrdersScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, []);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
          <Stack direction='row' spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Ups...</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight='100vh'>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>Id del pedido</Th>
                  <Th>Fecha del pedido</Th>
                  <Th>Total pagado</Th>
                  <Th>Productos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      {order.totalPrice}€ 
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (${item.price} /unidad)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
