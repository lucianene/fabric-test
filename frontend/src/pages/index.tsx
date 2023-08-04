import Image from 'next/image'
import Layout from './layout'
import { MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRecords } from '@/redux/recordSlice'

export default function Home() {
  const { records } = useSelector((state: any) => state.record)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const [ formHasErrors, setFormHasErrors ] = useState(false)
  const [ formData, setFormData ] = useState({
    title: '',
    release_year: '',
    imdb_id: '',
    images: '',
  })

  useEffect(() => {
    fetch('http://api.fabric-test.local/records')
    .then(data => data.json())
    .then(records => {
      // setRecords(records);
      dispatch(setRecords(records))
      setLoading(true)
    })
  }, [])

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

  const createRecord = () : void => {
    setFormHasErrors(false)

    // form validation
    if (
      formData.title.length == 0 ||
      formData.release_year.length == 0 ||
      formData.imdb_id.length == 0
      // formData.images.length == 0
    ) {
      setFormHasErrors(true)
      return
    }

    try {
      fetch('http://api.fabric-test.local/records', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(resp => resp.json())
      .then(data => {
        if (data) {
          dispatch(setRecords([...records, data]))
        }
      })
    } catch (error) {
      setFormHasErrors(true)
      console.log(error);
    }
  }

  if (!loading) {
    return <div style={{ margin: '0 auto', maxWidth: 500 }}>Loading records...</div>
  }

  return (
    <main>
      <div style={{ margin: '0 auto', maxWidth: 500 }}>
        <h2>Records:</h2>
        { records?.length && records.map((record: RecordType, index: number) => (
          <div style={{ display: 'flex', padding: 5, borderBottom: '1px solid gray' }} key={index}>
            <div style={{ flex: 1 }}>{ record.title }</div>
            <div><button onClick={() => deleteRecord(record)}>Delete</button></div>
          </div>
        )) }
        { !records?.length && <div>No records in db.</div> }

        <h2>Create record:</h2>
        <div style={{ marginBottom: 20 }}>
          <input onChange={e => setFormData({...formData, title: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="title" />
          <input onChange={e => setFormData({...formData, release_year: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="release_year" />
          <input onChange={e => setFormData({...formData, imdb_id: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="imdb_id" />
          <input onChange={e => setFormData({...formData, images: e.target.value})} style={{ display: 'block', padding: 5, marginBottom: 5}} type="text" placeholder="images" />
          <div style={{ marginBottom: 5, color: 'red', fontSize: '.75em' }}>
            { formHasErrors && formData.title.length == 0 && <div>Please enter the title</div> }
            { formHasErrors && formData.release_year.length == 0 && <div>Please enter the release year</div> }
            { formHasErrors && formData.imdb_id.length == 0 && <div>Please enter the imd id</div> }
          </div>
          <button style={{ display: 'block', padding: 5, marginTop: 15}} onClick={createRecord}>Create new record</button>
        </div>
      </div>
    </main>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}