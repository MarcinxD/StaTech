import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const CartScreen = () => {
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Ups...</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cart.length <= 0 ? (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Tu carrito está vacío.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to='/products'>
              {' '}
              ¡Échale un vistazo a nuestros productos!
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '4', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
          >
            <Stack spacing={{ base: '8', md: '10' }} flex='2'>
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Carrito
              </Heading>

              <Stack spacing='6'>{/* CartItem */}</Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1'>
              {/* CartOrderSummary */}

              <HStack mt='6' fontWeight='semibold'>
                <p>o</p>
                <Link as={ReactLink} to='/products' color={mode('orange.500', 'orange.200')}>
                  Sigue comprando
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;