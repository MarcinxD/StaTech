import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Alert,
  Stack,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  useToast,
  Text,
  Flex,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { TbTruckDelivery } from 'react-icons/tb';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, setDelivered, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemoveAlert from './ConfirmRemoveAlert';

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, orders, deliveredFlag, orderRemoval } = admin;
  const toast = useToast();

  useEffect(
    () => {
      dispatch(getAllOrders());
      dispatch(resetErrorAndRemoval());
      if (orderRemoval) {
        toast({ description: 'El pedido ha sido borrado', status: 'success', isClosable: true });
      }
      if (deliveredFlag) {
        toast({ description: 'El pedido ha sido actualizado.', status: 'success', isClosable: true });
      }
    },
    [orderRemoval, dispatch, toast, deliveredFlag],
    dispatch,
    toast
  );

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Ups...</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify='center'>
          <Stack direction='row' spacing='4'>
            <Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Información de envío</Th>
                  <Th>Productos pedidos</Th>
                  <Th>Precio envío</Th>
                  <Th>Total</Th>
                  <Th>Entregado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td> {new Date(order.createdAt).toDateString()} </Td>
                      <Td> {order.username} </Td>
                      <Td> {order.email} </Td>
                      <Td>
                        <Text>
                          <i>Dirección: </i> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>Ciudad: </i> {order.shippingAddress.postalCode}, {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>País: </i> {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.shippingPrice}</Td>
                      <Td>{order.totalPrice}</Td>
                      <Td>{order.isDelivered ? <CheckCircleIcon /> : 'Pendiente'}</Td>
                      <Td>
                        <Flex direction='column'>
                          <Button variant='outline' onClick={() => openDeleteConfirmBox(order)}>
                            <DeleteIcon mr='5px' />
                            Eliminar pedido
                          </Button>
                          {!order.isDelivered && (
                            <Button mt='4px' variant='outline' onClick={() => onSetToDelivered(order)}>
                              <TbTruckDelivery />
                              <Text ml='5px'>Entregado</Text>
                            </Button>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemoveAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemToDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
