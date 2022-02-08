import { 
  Flex, 
  Button, 
  Stack, 
  Text, 
  Avatar, 
  Input, 
  FormControl, 
} from '@chakra-ui/react'
import { FormEvent, useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { api } from '../../services/api'

export default function Home() {
  //estados dos inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  // useEffect(() => {
  //   api.get('/repos').then(res => console.log(res.data))
  // }, [])


  //funcção de submit chamada no form
  //preciso fazer async await por causa do context
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password
    }
    
    //passo o data pra function do context
    await signIn(data)
    setEmail('')
    setPassword('')
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="#202225">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        border="1px solid #2d2e2f"
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            name="Main Leaf"
            size="xl"
            bg="none"
            src="https://gitlab.com/uploads/-/system/user/avatar/1821090/avatar.png"
          />
          {/* <Flex border="1px solid red" px="4"> */}
          <Text
            color="#fff"
            fontWeight="bold"
            textAlign="center"
            mt="4"
            fontSize="2xl"
          >
            login with your
          </Text>
          <Text
            color="#fff"
            fontWeight="bold"
            textAlign="center"
            fontSize="2xl"
          >
            Omni Leaf account!
          </Text>
          {/* </Flex> */}
        </Flex>
        <FormControl onSubmit={handleSubmit}>
          <Stack spacing="4" mt='6'>
            <Input
              id='email'
              type='email'
              focusBorderColor="#078646"
              bgColor="gray.900"
              color="#fff"
              variant="filled"
              _hover={{
                bgColor: 'gray.900'
              }}
              size="lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              type="password"
              label="Senha"
              focusBorderColor="#078646"
              bgColor="gray.900"
              color="#fff"
              variant="filled"
              _hover={{
                bgColor: 'gray.900'
              }}
              size="lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

          </Stack>
        </FormControl>

        <Button
          type="submit"
          mt="8"
          colorScheme="#078646"
          bg="#078646"
          alignSelf="center"
          w="12rem"
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
