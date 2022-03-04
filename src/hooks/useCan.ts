import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { validateUserPermission } from "../utils/validateUserPermission"

interface UseCanProps {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ permissions, roles}: UseCanProps){
  const { user, isAuthenticated } = useContext(AuthContext)

  if(!isAuthenticated){
    return false
  }

  const userHasValidPermission = validateUserPermission({
    user,
    permissions,
    roles
  })

  return userHasValidPermission
}