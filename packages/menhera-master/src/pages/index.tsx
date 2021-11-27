import Link from 'next/link';
import { Text } from '@chakra-ui/react';

export default (): JSX.Element => (
  <Link href="/dashboard/home">
    <Text textAlign="center" alignSelf="center">
      CLICA AE PAE
    </Text>
  </Link>
);
