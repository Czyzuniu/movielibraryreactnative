import {Box, Button, Center, Heading, Input, Stack, Text, useTheme, View} from "native-base";
import React, {useState} from "react";
import Logo from "../../../../base/presentation/components/Logo";
import {ImageBackground} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  useCreateSessionMutation,
  useLazyCreateRequestTokenQuery,
  useLoginMutation
} from "../../../../redux/services/auth";
import {StackScreenProps} from "@react-navigation/stack";
import {HomeStackParamList} from "../../../../navigation/types";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {authenticate} from "../../../../redux/slice/session";
import AsyncStorageUtils from "../../../../utils/AsyncStorageUtils";
import {useLazyGetAccountDetailsQuery} from "../../../../redux/services/account";

type Props = StackScreenProps<HomeStackParamList, 'Login'>;

export default function Login({navigation}: Props) {
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme()
  const [createRequestToken] = useLazyCreateRequestTokenQuery();
  const [createSession] = useCreateSessionMutation();
  const [getAccountDetails] = useLazyGetAccountDetailsQuery();
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch();

  const onLoginPress = async () => {
    setLoading(true)
    const requestToken = await createRequestToken().unwrap()
    const loginSession = await login({
      username: 'Czyzuniu',
      password: 'jbVT6zN@tGjEYgC',
      request_token: requestToken.request_token
    }).unwrap()
    const session = await createSession(loginSession.request_token).unwrap()
    await AsyncStorageUtils.persist('session_id', session.session_id)
    const accountDetails = await getAccountDetails().unwrap()
    dispatch(authenticate({
      sessionId: session.session_id,
      username: accountDetails.username
    }))
    setLoading(false)
  }

  return (
    <ImageBackground style={{
      flex: 1,
    }} source={require('../../../../../assets/login_wallpaper.jpg')}
    >
      <View style={{
        backgroundColor: 'rgba(0,0,45,0.5)',
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
        <Center>
          <Logo/>
          <Heading m={5} size={'sm'} color={colors.white}>The Movie DB</Heading>
          <Stack space={5} w="80%" m={2}>
            <Input
              InputRightElement={
                <Icon name={'user'} size={25} color={'white'}/>
              }
              borderBottomColor={'white'}
              variant={'underlined'}
              size={'md'}
              placeholderTextColor={'white'}
              placeholder="Username..."/>
            <Input
              InputRightElement={
                <Icon name={'lock'} size={25} color={'white'}/>
              }
              type={'password'}
              borderBottomColor={'white'} variant={'underlined'} size={'md'} placeholderTextColor={'white'}
              placeholder="Password..."/>
            <Center>
              <Button
                isLoading={loading}
                spinnerPlacement={'end'}
                w={'75%'} rounded={'full'}
                variant={'solid'}
                colorScheme={'success'} onPress={onLoginPress}
              >
                <Text textAlign={'center'}>
                  Login
                </Text>
              </Button>
            </Center>
          </Stack>
        </Center>
        <Box flex={0.2}>
          <Center>
            <Heading size={"xs"} color={colors.white}> Do not have an account? Sign up here!</Heading>
          </Center>
        </Box>
      </View>
    </ImageBackground>
  )
}
