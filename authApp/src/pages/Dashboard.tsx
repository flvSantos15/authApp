import {Flex, Text} from '@chakra-ui/react'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { api } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    api.get(`/me`)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }, [])

  return(
    <Flex p='5'>
      <Text fontSize='2xl' fontWeight='bold' color='#fff'>
        Dashboard: {user?.email}
      </Text>
    </Flex>
  )
}

//pare no 7:00 validando autenticação server

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const response = await api.get('/me')
  console.log(response.data)
  return{
    props: {}
  }
})