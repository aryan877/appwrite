import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Databases, ID, Teams } from 'appwrite';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { client } from '../utils/appwriteConfig';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { showNotification } = useNotification();
  const addMemberHandler = async () => {
    const teams = new Teams(client);
    const promise = teams.createMembership(
      id as string,
      email,
      [],
      'http://localhost:3000/join'
    );

    promise.then(
      function (response) {
        showNotification('e-mail sent successfully');
        onClose();
      },
      function (error) {
        showNotification('Something went wrong');
        onClose();
      }
    );
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailEndingClick = (ending: string) => {
    setEmail((prevEmail) => prevEmail + ending);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent zIndex="99999999" bg="blue.500">
        <ModalHeader>Invite New Member</ModalHeader>
        <ModalBody>
          <Text mb={4} color="white" fontSize="sm">
            Please enter the email address of the member you want to add. They
            will receive an email with a link to join the team.
          </Text>

          <Input
            variant="outline"
            color="white"
            _placeholder={{ color: 'white' }}
            placeholder="Enter email name"
            value={email}
            type="email"
            autoComplete="on"
            onChange={handleEmailChange}
          />
          <Button
            color="white"
            mt={2}
            mr={2}
            fontSize="sm"
            onClick={() => handleEmailEndingClick('@gmail.com')}
          >
            @gmail.com
          </Button>
          <Button
            color="white"
            mt={2}
            mr={2}
            fontSize="sm"
            onClick={() => handleEmailEndingClick('@yahoo.com')}
          >
            @yahoo.com
          </Button>
          <Button
            color="white"
            mt={2}
            mr={2}
            fontSize="sm"
            onClick={() => handleEmailEndingClick('@outlook.com')}
          >
            @outlook.com
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="unstyled"
            mr={4}
            onClick={onClose}
            _hover={{ transform: 'scale(1.05)' }}
          >
            Cancel
          </Button>
          <Button
            bg="white"
            color="gray.800"
            borderRadius="full"
            _hover={{ transform: 'scale(1.05)' }}
            onClick={addMemberHandler}
            isDisabled={email.length === 0}
          >
            Send Invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteMemberModal;
