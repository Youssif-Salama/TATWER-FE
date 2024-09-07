import SystemsCollection from '@/components/systems/SystemsCollection'
import { Helmet } from 'react-helmet'

const Systems = () => {
  return (
    <div>
      <Helmet title="شركه النور | صفحه الدفعات" />
      <SystemsCollection/>
    </div>
  )
}

export default Systems
