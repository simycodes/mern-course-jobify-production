// THIS IS THE CUSTOM HOOK THAT WILL BE USED TO ACCESS AppContext WHICH HOLDS
// VARIABLES TO  BE ACCESSED IN EVERY COMPONENT
import { useAppContext } from "../context/appContext"

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`} >
      {alertText}
    </div>
  )
}
export default Alert