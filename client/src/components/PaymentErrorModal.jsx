import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Wrap,
} from '@chakra-ui/react';

const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify='center' direction='column' align='center' mt='20px'>
              <Alert
                h='200px'
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
              >
                <AlertIcon boxSize='55px' />
                <AlertTitle pt='8px' fontSize='xl'>
                  Ha habido un error con el pago del pedido...
                </AlertTitle>
                <AlertDescription>No se ha podido procesar tu pago</AlertDescription>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentErrorModal;
