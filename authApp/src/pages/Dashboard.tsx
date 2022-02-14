import {Flex, Text} from '@chakra-ui/react'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'
import { setupApiClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    api.get(`/me`)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }, [])

  return(
    <Flex p='5' bg='#222f2b'>
      <Text fontSize='2xl' fontWeight='bold' color='#fff'>
        Dashboard: {user?.email}
      </Text>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  
  const response = await apiClient.get('/me')
  console.log(response.data)
  
  return{
    props: {}
  }
})