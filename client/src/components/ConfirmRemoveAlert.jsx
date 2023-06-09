import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const ConfirmRemoveAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction }) => {
  const dispatch = useDispatch();
  const onDeleteItem = () => {
    dispatch(deleteAction(itemToDelete._id));
    onClose();
  };
  return <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
    <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' >
                Borrar a {itemToDelete.name}
            </AlertDialogHeader>
            <AlertDialogBody>¿Estás seguro? Una vez borrado no se puede deshacer el cambio.</AlertDialogBody>
            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} >Cancel</Button>
                <Button colorScheme='red' onClick={onDeleteItem} ml={3} >
                    Borrar a {itemToDelete.name}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>;
};

export default ConfirmRemoveAlert;
