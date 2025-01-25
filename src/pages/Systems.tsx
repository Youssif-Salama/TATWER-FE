import Reports from '@/components/home/Reports'
import SystemsCollection from '@/components/systems/SystemsCollection'
import { Helmet } from 'react-helmet'

const Systems = () => {
  return (
    <>
      <Helmet title="شركه تطوير البوادي | صفحه الدفعات" />
            <Reports/>

      <SystemsCollection/>
    </>
  )
}

export default Systems
