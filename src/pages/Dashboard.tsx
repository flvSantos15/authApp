import {Button, Flex, Text} from '@chakra-ui/react'
import { useContext } from 'react'
import { Can } from '../components/Can'
import { AuthContext } from '../context/AuthContext'
import { setupApiClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard(){
  const { user, signOut } = useContext(AuthContext)

  return(
    <Flex p='5' flexDir='column'>
      <Text fontSize='2xl' fontWeight='bold'>
        Dashboard: {user?.email}
      </Text>

      <Button w='5rem' onClick={signOut}>Sign out</Button>

      <Can permissions={['metrics.list']}>
        <>
          Métricas
        </>
      </Can>
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

function useCan() {
  throw new Error('Function not implemented.')
}
