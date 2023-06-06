import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { setExpress } from '../redux/actions/cartAction';
import { useState } from 'react';
import { setShippingAddress, setShippingAddressError } from '../redux/actions/orderActions';

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: '', postalCode: '', city: '', country: '' }}
      validationSchema={Yup.object({
        address: Yup.string().required('Este campo es obligatorio.').min(2, 'La dirección proporcionada no es válida'),
        postalCode: Yup.string()
          .required('Este campo es obligatorio.')
          .min(2, 'El código postal proporcionado no es válido.'),
        city: Yup.string().required('Este campo es obligatorio.').min(2, 'La ciudad proporcionada no es válida.'),
        country: Yup.string().required('Este campo es obligatorio.').min(2, 'El país proporcionado no es válido'),
      })}
    >
      {(formik) => (
        <VStack as='form'>
          <FormControl
            onChange={
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name='address' placeholder='Dirección de envío' label='Dirección de envío' />
            <Flex>
              <Box flex='1' mr='10'>
                <TextField name='postalCode' placeholder='Código postal' label='Código postal' type='number' />
              </Box>
              <Box flex='2'>
                <TextField name='city' placeholder='Ciudad' label='Ciudad' />
              </Box>
            </Flex>
            <TextField name='country' placeholder='País' label='País' />
          </FormControl>
          <Box w='100%' h='180px' pr='5'>
            <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
              Modo de envío
            </Heading>
            <RadioGroup
              defaultValue='false'
              onChange={(e) => {
                dispatch(setExpress(e));
              }}
            >
              <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
                  <Box>
                    <Radio value='true'>
                      <Text fontWeight='bold'>Exprés 14.99€</Text>
                      <Text>Envío en 24 horas.</Text>
                    </Radio>
                  </Box>
                  <Stack spacing='6'>Exprés</Stack>
                </Stack>
                <Radio value='false'>
                  <Tooltip label='Envío gratis para pedidos a partir de 1000€.'>
                    <Box>
                      <Text fontWeight='bold'>Estándar 4.99€</Text>
                      <Text>Envío en 2-3 días laborables.</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInformation;
