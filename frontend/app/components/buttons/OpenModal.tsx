'use client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Children, ReactNode } from 'react';

export default function OpenModal({
  btnTitle,
  btnColor,
  children,
}: {
  btnTitle: string;
  btnColor: 'yellowBtn' | 'grayBtn'
  children: ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        className={`btn ${btnColor} glitch overflow-hidden`}
        onPress={onOpen}
      >
        {btnTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        isKeyboardDismissDisabled={true}
        isDismissable={false}
        size="sm"
        className="glassmorphism overflow-hidden"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {Children.map(children, (child, index) => {
                if (index === 0)
                  return (
                    <ModalHeader className="flex flex-col gap-1">
                      {child}
                    </ModalHeader>
                  );

                if (index === 1) return <ModalBody>{child}</ModalBody>;

                if (index === 2)
                  return (
                    <ModalFooter className="flex justify-center">
                      {child}
                    </ModalFooter>
                  );
              })}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
