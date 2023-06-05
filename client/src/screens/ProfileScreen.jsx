import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordField';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({ description: 'Perfil guardado.', status: 'success', isClosable: true });
      dispatch(resetUpdateSuccess());
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: '', name: userInfo.name, confirmPassword: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('El nombre es necesario'),
        email: Yup.string().email('Correo inválido.').required('Es necesario un correo electrónico.'),
        password: Yup.string()
          .min(1, 'La contraseña es demasiado corta. Debe contener un mínimo de x caracteres.')
          .required('Debe introducir la contraseña.'),
        confirmPassword: Yup.string()
          .min(1, 'La contraseña es demasiado corta. Debe contener un mínimo de x caracteres.')
          .required('Debe introducir la contraseña.')
          .oneOf([Yup.ref('password'), null], 'Las contraseñas tienen que coincidir'),
      })}
      onSubmit={(values) => {
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH='100vh'
          maxWidth={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing='10' direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack flex='1.5' mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Perfil de usuario
              </Heading>
              <Stack spacing='6'>
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                    >
                      <AlertIcon />
                      <AlertTitle>Ups...</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing='5'>
                    <FormControl>
                      <TextField type='text' name='name' placeholder='Nombre y apellidos' label='Nombre completo' />
                      <TextField type='text' name='email' placeholder='correo@ejemplo.com' label='Correo electrónico' />
                      <PasswordTextField
                        type='password'
                        name='password'
                        placeholder='Tu contraseña'
                        label='Contraseña'
                      />
                      <PasswordTextField
                        type='password'
                        name='confirmPassword'
                        placeholder='Repite la contraseña'
                        label='Repite la contraseña'
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
              <Card>
                <CardHeader>
                  <Heading size='md'>Datos de usuario</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Cuenta creada el {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
