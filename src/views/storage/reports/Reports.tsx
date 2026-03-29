import { ReactElement, useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useErrorBoundary } from 'react-error-boundary';
import { getItemsInStorage } from '../../../api/storage/reports';
import { projectContext } from '../../../context/ProjectContextProvider';
import Loading from '../../shared/Loading';
import ProductsTable from '../../product/list/ProductsTable';
import { authContext } from '../../../context/AuthContextProvider';
import { AuthenticationRequired } from '../../AuthenticationRequired';

function Reports() {
  const [reportElement, setReportElement] = useState<ReactElement>()
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [reportTitle, setReportTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { hasPermission } = useContext(projectContext)
  const { showBoundary } = useErrorBoundary()
  const { isSignedIn } = useContext(authContext)

  async function loadItemsInStorage() {
    setIsLoading(true)
    try {
      const res = await getItemsInStorage(date)
      console.log(res)
      setReportElement(<ProductsTable products={res ?? []} fieldsToExclude={[]} />)
      setReportTitle(`Продукты в хранилище за ${date}`)
    }
    catch (error: Error | any) {
      showBoundary(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    document.title = "Отчеты"
  }, [])

  return !isSignedIn() ? (<AuthenticationRequired />) : (
    <>
      <div className='d-flex justify-content-between flex-column flex-lg-row'>
        <div className='d-flex flex-column'>
          <h2>{reportTitle}</h2>
          {
            isLoading ? <Loading />
              : reportElement
          }
        </div>
        <div>
          <ul className='list-group'>
            <div className="input-group mb-3">
              <label className="input-group-text">Остатки за дату</label>
              <input
                className="form-control"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <Button onClick={loadItemsInStorage}>Подтвердить</Button>
            </div>
          </ul>
        </div>
      </div>

    </>
  )
}

export default Reports;
