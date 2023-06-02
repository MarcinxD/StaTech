import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Cuenta creada correctamente. ¡Bienvenid@ a bordo!', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
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
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={{ headingBR }}>Crea una cuenta.</Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>¿Ya tienes una cuenta?</Text>
                  <Button as={ReactLink} to='/register' variant='link' colorScheme='orange'>
                    Inicia sesión
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}
            >
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
                    <TextField type='text' name='name' placeholder='Tu nombre.' label='Nombre' />
                    <TextField type='text' name='email' placeholder='correo@ejemplo.com' label='Correo electrónico' />
                    <PasswordTextField type='password' name='password' placeholder='Tu contraseña' label='Contraseña' />
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
                    Registrarse
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterScreen;
