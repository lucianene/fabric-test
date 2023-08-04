import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRecords } from '../redux/recordSlice'
import OMDbService from './OMDbService'

export default function RecordsService() {
  const { records } = useSelector((state: any) => state.record)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const [ formHasErrors, setFormHasErrors ] = useState(false)
  const { fetchRecord } = OMDbService()
  const [ formError, setFormError ] = useState('')

  const formDataInitialState = {
    title: '',
    release_year: '',
    imdb_id: '',
    images: '',
  }

  const [ formData, setFormData ] = useState({...formDataInitialState})

  useEffect(() => {
    loadRecords()
  }, [])

  const loadRecords = () => {
    fetch('http://api.fabric-test.local/records')
    .then(data => data.json())
    .then(records => {
      // setRecords(records);
      dispatch(setRecords(records))
      setLoading(true)
    })
  }

  const deleteRecord = (record: RecordType) => {
    fetch('http://api.fabric-test.local/records/' + record.id, {
      method: 'POST',
      body: JSON.stringify({
        _method: 'DELETE'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(resp => resp.json())
    .then(data => {
      if (data) {
        dispatch(setRecords(records.filter((r: RecordType) => r.id !== record.id)))
      }
    })
  }

  const createRecordApiCall = (formData: {}) => {
    fetch('http://api.fabric-test.local/records', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(resp => resp.json())
    .then(data => {
      if (data && data?.success !== false) {
        dispatch(setRecords([...records, data]))
        setFormData(formDataInitialState)
      } else {
        setFormError(data.message)
      }
    })
  }

  const createRecord = () : void => {
    setFormHasErrors(false)
    setFormError('')

    // form validation
    if (
        formData?.imdb_id?.length === 0 &&
        (formData?.title?.length == 0 || formData?.release_year?.length == 0)
    ) {
      setFormHasErrors(true)
      return
    }

    // if imdb_id is provided, enrich data and send to db
    if (formData.imdb_id.length > 0) {
      fetchRecord(formData.imdb_id)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data && !data?.Error) {
            const newFormData = {
              ...formData,
              title: data.Title,
              release_year: data.Year,
              imdb_id: data.imdbID,
            }
            setFormData(newFormData)
            createRecordApiCall(newFormData)
          } else {
            setFormError('Cannot fetch data for the provided id.')
          }
        })
      return
    }

    createRecordApiCall(formData)
  }

  return {
    records,
    formData,
    setFormData,
    loadRecords,
    deleteRecord,
    createRecord,
    loading,
    formHasErrors,
    formError,
  }
}