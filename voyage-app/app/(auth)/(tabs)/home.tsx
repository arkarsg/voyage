import React from 'react';
import { YStack, H3, XStack, Text, Paragraph, Form } from 'tamagui';
import { LmInputRhf } from '@tamagui-extras/form';
import { LmAlert, LmButton } from '@tamagui-extras/core';
import { useForm } from 'react-hook-form';

export default function HomeTab(): React.JSX.Element {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: undefined,
      password: undefined,
    },
  });
  return (
    <Form
      gap={'$3'}
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <LmAlert severity={'info'} outlined>
        <Paragraph>You can use `useForm` directly from "react-hook-form".</Paragraph>
      </LmAlert>
      <LmInputRhf
        name={'name'}
        control={control}
        label={'Name'}
        placeholder={'Type your name...'}
        labelInline
        required
      />
      <LmInputRhf
        name={'email'}
        control={control}
        label={'Name'}
        placeholder={'Type your email...'}
        labelInline
      />
      <LmInputRhf
        name={'password'}
        control={control}
        label={'Password'}
        isPassword
        placeholder={'Your password...'}
        labelInline
      />

      <XStack gap={'$3'}>
        <LmButton onPress={() => reset()}>Reset</LmButton>
        <Form.Trigger asChild>
          <LmButton colorVariant={'primary'}>Submit</LmButton>
        </Form.Trigger>
      </XStack>
    </Form>
  );
}
