import {Flex, Text} from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UseCan } from '../hooks/useCan'
import { setupApiClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard(){
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = UseCan({
    permissions: ['metrics.list']
  })

  return(
    <Flex p='5' flexDir='column'>
      <Text fontSize='2xl' fontWeight='bold'>
        Dashboard: {user?.email}
      </Text>

      { userCanSeeMetrics && <Text>Métrics</Text>}
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
