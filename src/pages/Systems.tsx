import SystemsCollection from '@/components/systems/SystemsCollection'
import { Helmet } from 'react-helmet'

const Systems = () => {
  return (
    <div>
      <Helmet title="شركه تطوير البوادي | صفحه الدفعات" />
      <SystemsCollection/>
    </div>
  )
}

export default Systems
