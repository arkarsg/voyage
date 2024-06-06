import React from 'react';
import { Stack, Button } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';

const Icon = <Feather name="briefcase" size={24} color="purple" />;

export default function VoyageHeaderButton(): React.JSX.Element {
  return (
    <Button
      chromeless
      circular
      size="$2"
      icon={() => <Feather name="briefcase" size={24} color="purple" />}
    />
  );
}
